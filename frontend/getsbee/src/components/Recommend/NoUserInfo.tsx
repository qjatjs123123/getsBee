import React from 'react';
import noOptionalInfo from '../../assets/noOptionalInfo.png';

const NoUserInfo = () => {
  return (
    <div>
      <p>포스트를 추천받고 싶으신가요?</p>
      <p>지금 정보를 입력하고 개인 맞춤 피드를 추천받아 보세요!</p>
      <img src={noOptionalInfo} alt="No Optional Info" />
    </div>
  );
};

export default NoUserInfo;
