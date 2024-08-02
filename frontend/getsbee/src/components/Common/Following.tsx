import React, { useState } from 'react';
import starIcon from '../../assets/starIcon.png';
import stargIcon from '../../assets/stargIcon.png';

function Following() {
  const [isFollowing, setIsFollowing] = useState(true);

  const user = {
    name: 'chanhyun11',
    directoryName: 'IT > Front',
    avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
  };

  const handleStarClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleStarClick();
    }
  };

  return (
    <div
      className="relative border rounded-[6px]"
      style={{
        width: '220px',
        height: '80px',
        borderColor: '#EFEFEF',
        borderWidth: '2px',
      }}
    >
      <div className="flex justify-between items-center">
        <p className="ml-2 mt-1 text-[18px] font-bold" style={{ color: '#5C5C5C' }}>
          {user.directoryName}
        </p>
        <img
          className="mt-1 mr-2 w-[20px] h-[20px] cursor-pointer"
          src={isFollowing ? starIcon : stargIcon}
          alt="starIcon"
          onClick={handleStarClick}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="absolute bottom-2 left-2 flex items-center">
        <img src={user.avatar} alt={user.avatar} className="w-[25px] h-[25px]" />
        <p className="ml-1 text-[#5C5C5C] text-[14px]">{user.name}</p>
      </div>
    </div>
  );
}

export default Following;
