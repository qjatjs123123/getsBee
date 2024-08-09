import React, { useState, useEffect } from 'react';
import starIcon from '../../assets/starIcon.png';
import stargIcon from '../../assets/stargIcon.png';

// DirectorySearchItem 컴포넌트에 props로 item 데이터를 받도록 수정
const DirectorySearchItem = ({ item }) => {
  // console.log(item);

  // 팔로우 상태를 관리하는 useState 훅
  const [isFollowing, setIsFollowing] = useState(true);

  // 별 아이콘 클릭 시 팔로우 상태를 토글하는 함수
  const handleStarClick = () => {
    setIsFollowing(!isFollowing);
  };

  // 키보드 이벤트 처리 함수 (Enter 또는 Space 키)
  const handleKeyPress = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleStarClick();
    }
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
          <p className="ml-2 mt-4 text-[16px] font-bold" style={{ color: '#5C5C5C' }}>
            {item.directory.directoryName}
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-4 flex items-center">
        <div className="flex">
          <img
            src={item.member.memberPicture}
            alt={item.member.memberName}
            className="w-[22px] h-[22px] rounded-full"
          />
          <p className="ml-1 text-[#5C5C5C] text-[12px]">{item.member.memberName}</p>
        </div>
      </div>
      <img
        className="w-[20px] h-[20px] absolute top-5 right-5 cursor-pointer"
        src={item.follow.isFollowedByCurrentUser ? starIcon : stargIcon}
        alt="starIcon"
        onClick={handleStarClick}
        onKeyPress={handleKeyPress}
      />

      {item.subscriber && (
        <span className="absolute bottom-2 right-2 text-[14px] font-bold" style={{ color: '#07294D' }}>
          {item.subscriber}
        </span>
      )}
    </div>
  );
};

export default DirectorySearchItem;
