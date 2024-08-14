import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import userIcon from '../../assets/userIcon.png';
import colorBeeIcon from '../../assets/colorBeeIcon.png';
import GoogleOAuth from './GoogleOAuth';
import { userState } from '../../recoil/userState';
import PopupMenu from './PopupMenu';

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      setVisible(false);
    }
  }, [user]);

  const renderDialogContent = () => (
    <div className="flex md:flex-row items-stretch h-80">
      <div className="flex flex-col items-center justify-center py-8 px-4 md:px-8 bg-[#FFF6E3] w-full md:w-2/5 rounded-l-lg">
        <img src={colorBeeIcon} alt="Yellow Bee Icon" className="w-40 mb-8 mr-6" />
        <h2 className="text-3xl font-bold text-[#8D8D8D] text-center">환영합니다!</h2>
      </div>

      <div className="flex flex-col items-center justify-center py-8 px-4 md:px-8 bg-white w-full md:w-3/5 rounded-r-lg">
        <h2 className="text-3xl font-semibold text-[#8D8D8D] mb-8">소셜 계정으로 로그인</h2>
        <GoogleOAuth w-full max-w-xs />
      </div>
    </div>
  );

  if (user) {
    return <PopupMenu />;
  }

  return (
    <div className="card flex justify-content-center">
      <Button
        onClick={() => setVisible(true)}
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        className="focus:outline-none focus:shadow-none p-0 mr-[28px]"
      >
        <img src={userIcon} alt="Myhive Icon" className="h-8" />
      </Button>
      <Dialog
        visible={visible}
        modal
        onHide={() => setVisible(false)}
        content={renderDialogContent}
        dismissableMask
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '80vw', maxWidth: '800px' }}
      />
    </div>
  );
};

export default Menu;
