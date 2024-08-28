import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import starIcon from '../../assets/starIcon.png';
import stargIcon from '../../assets/stargIcon.png';
import { deleteFollow, createFollow } from '../../api/FollowingListApi';

// DirectorySearchItem 컴포넌트에 props로 item 데이터를 받도록 수정
const DirectorySearchItem = ({ item }) => {
  const navigate = useNavigate();
  const memberEmail = item.member.memberEmail.split('@')[0];
  // 팔로우 상태를 관리하는 useState 훅
  const [isFollowing, setIsFollowing] = useState(item.follow.isFollowedByCurrentUser);

  // 별 아이콘 클릭 시 팔로우 상태를 토글하는 함수
  const handleStarClick = async () => {
    try {
      if (isFollowing) {
        // 팔로우 취소 API 호출
        await deleteFollow(item.follow.followId);
      } else {
        // 팔로우 생성 API 호출
        await createFollow(item.directory.directoryId);
      }

      // API 호출이 성공하면 팔로우 상태를 토글
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('팔로우 상태를 변경하는 동안 오류가 발생했습니다:', error);
    }
  };
  // 키보드 이벤트 처리 함수 (Enter 또는 Space 키)
  const handleKeyPress = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleStarClick();
    }
  };

  const moveToMember = () => {
    navigate(`/myhive/${memberEmail}/${item.directory.directoryId}`);
  };

  const moveToMemberProfile = () => {
    navigate(`/myhive/${memberEmail}`);
  };

  // 전달된 item 데이터를 콘솔에 출력
  useEffect(() => {
    console.log('Received item:', item);
  }, [item]);

  return (
    <div
      className="relative border rounded-[6px] m-3 p-2 md:w-54 w-64"
      style={{
        height: '7rem',
        borderColor: '#EFEFEF',
        borderWidth: '2px',
      }}
    >
      <div className="absolute top-2 left-4 text-[12px] text-blue-600">
        {item.follow.followCount} <span className="text-[10px]">명이 구독합니다.</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p
            className="ml-2 mt-4 text-[16px] text-[#5C5C5C] font-bold hover:text-blue-700"
            onClick={moveToMember}
            role="button"
            tabIndex={0}
          >
            {item.directory.directoryName.split(' / ').map((name, index) => (
              <React.Fragment key={index}>
                {index > 0 && '/ '}
                {name}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-4 flex items-center">
        <div className="flex items-center" onClick={moveToMemberProfile} role="button" tabIndex={0}>
          <img
            src={item.member.memberPicture}
            alt={item.member.memberName}
            className="w-[22px] h-[22px] rounded-full"
          />
          <p className="ml-1 text-[#5C5C5C] text-[14px]">{item.member.memberEmail?.split('@')[0]}</p>
        </div>
      </div>

      {item.subscriber && (
        <span className="absolute bottom-2 right-2 text-[14px] font-bold" style={{ color: '#07294D' }}>
          {item.subscriber}
        </span>
      )}
    </div>
  );
};

export default DirectorySearchItem;
