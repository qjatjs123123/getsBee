import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import noOptionalInfo from '../../assets/noOptionalInfo.png';
import UserInfoForm from './UserInfoForm';

interface UserInfo {
  birthYear: number | null;
  interests: string[];
}

const NoUserInfo = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSave = (data: UserInfo) => {
    console.log('Saved data:', data);
    // 데이터 저장 로직을 추가 필요
    setVisible(false);
  };

  const renderDialogContent = () => {
    return <UserInfoForm onClose={handleClose} onSave={handleSave} />;
  };

  return (
    <div className="flex flex-col items-center mt-[80px] p-4">
      <div className="text-center max-w-2xl">
        <p className="text-2xl font-black text-[#253746] mb-2">포스트를 추천받고 싶으신가요?</p>
        <p className="text-lg text-[#8D8D8D] mb-6">지금 정보를 입력하고 개인 맞춤 피드를 추천받아 보세요!</p>
        <img src={noOptionalInfo} alt="No Optional Info" className="mx-auto w-full max-w-36 h-auto mb-8" />

        <div className="card flex justify-center">
          <Button
            label="정보입력"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
            raised
            className="border-0 bg-[#FFBF09] focus:shadow-none hover:bg-[#E5AB08] transition-colors duration-300"
          />
          <Dialog visible={visible} modal onHide={handleClose} content={renderDialogContent} dismissableMask />
        </div>
      </div>
    </div>
  );
};

export default NoUserInfo;
