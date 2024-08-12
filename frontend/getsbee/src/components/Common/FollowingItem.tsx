import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import starIcon from '../../assets/starIcon.png';
import stargIcon from '../../assets/stargIcon.png';
import { deleteFollow, createFollow } from '../../api/FollowingListApi';

const FollowingItem = ({ item, showStarIcon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberEmail = item.member.memberEmail.split('@')[0];

  const isFollowerPage = location.pathname.includes('follower');

  const handleStarClick = async (event) => {
    event.stopPropagation(); // 부모의 클릭 이벤트가 발생하지 않도록 함

    if (showStarIcon) {
      const confirmed = window.confirm('정말로 팔로우를 취소하시겠습니까?');
      if (!confirmed) {
        return;
      }
      await deleteFollow(item.follow.followId); // 팔로우 취소
    } else {
      await createFollow(item.directory.directoryId); // 팔로우 생성
    }

    // Since we don't manage internal state anymore, the parent component should re-render to reflect changes.
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleStarClick(event);
    }
  };

  const moveToMember = () => {
    navigate(`/myhive/${memberEmail}/${item.directory.directoryId}`);
  };

  return (
    <div
      className="relative border rounded-[6px] m-3 p-2 md:w-54 w-64"
      style={{
        height: '6.5rem',
        borderColor: '#EFEFEF',
        borderWidth: '2px',
      }}
      onClick={moveToMember}
      role="button"
      tabIndex={0}
    >
      {!isFollowerPage && (
        <div className="absolute top-2 left-4 text-[12px] text-blue-600">
          {item.follow.followCount}
          <span className="text-[10px]">명이 구독합니다.</span>
        </div>
      )}
      {!isFollowerPage ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="ml-2 mt-4 text-[16px] text-[#5C5C5C] font-bold hover:text-blue-700">
              {item.directory.directoryName}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="ml-2 mt-1 text-[16px] text-[#5C5C5C] font-bold hover:text-blue-700">
              {item.directory.directoryName}
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-4 flex items-center">
        <div className="flex">
          <img src={item.member.picture} alt={item.member.memberName} className="w-[22px] h-[22px] rounded-full" />
          <p className="ml-1 text-[#5C5C5C] text-[14px]">{memberEmail}</p>
        </div>
      </div>

      {showStarIcon && (
        <img
          className="w-[20px] h-[20px] absolute top-5 right-5 cursor-pointer"
          src={showStarIcon ? starIcon : stargIcon} // showStarIcon 상태에 따라 아이콘 변경
          alt="starIcon"
          onClick={handleStarClick}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

export default FollowingItem;
