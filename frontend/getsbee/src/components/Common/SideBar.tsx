import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import beeIcon from '../../assets/beeIcon.png';
import settingIcon from '../../assets/settingIcon.png';

const SideBar: React.FC = () => {
  const user = {
    avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    name: 'Hoseok Lee',
    post: '5',
    following: '120',
    follower: '84',
  };

  return (
    <aside className="fixed h-full w-[224px] bg-[#fff6e3] rounded-r-[28px] flex flex-col">
      <Link to="/home" className="flex items-center ml-[20px] mt-[24px] font-bold">
        <img className="w-[32px] h-[32px] mr-[12px]" src={beeIcon} alt="beeIcon" />
        <h2 className="text-[#07294d] text-[30px] cursor-pointer">getsBee</h2>
      </Link>
      <div className="flex-grow flex flex-col items-center mt-6">
        <Avatar image={user.avatar} size="large" shape="circle" className="w-[80px] h-[80px]" />
        <div className="mt-1 text-[19px] font-bold" style={{ color: '#253746' }}>
          {user.name}
        </div>
        <div className="mt-3 flex space-x-6">
          <div className="text-center">
            <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
              {user.post}
            </p>
            <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
              게시글
            </p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
              {user.follower}
            </p>
            <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
              팔로워
            </p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
              {user.following}
            </p>
            <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
              팔로잉
            </p>
          </div>
        </div>
        <hr className="w-[80%] mt-5" style={{ borderTop: '1px solid #EDDEEA' }} />
      </div>
      <img className="absolute bottom-5 right-5 w-[32px] h-[32px]" src={settingIcon} alt="settingIcon" />
    </aside>
  );
};

export default SideBar;
