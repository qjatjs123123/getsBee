import React from 'react';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import FollowingItem from '../components/Common/FollowingItem';
import userIcon2 from '../assets/userIcon2.png';
import FollowSearchBar from '../components/Common/FollowSearchBar';

const Following: React.FC = () => {
  const followItems = Array.from({ length: 7 }, (_, index) => <FollowingItem key={index} />);

  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="flex mt-[75px] mb-[5px] ml-[10px]">
            <img className="w-[32px] h-[32px]" src={userIcon2} alt="userIcon" />
            <p className="flex items-center text-[#CC9C00] text-[20px] font-bold">following</p>
          </div>
          <div className="mb-[35px] mr-[12px]">
            <Menu />
          </div>
        </div>
        <div className="flex justify-end mt-5 mr-5">
          <FollowSearchBar />
        </div>
        <div className="mt-5 p-5">
          <div className="grid gap-x-0 gap-y-14 grid-cols-3 justify-items-center">{followItems}</div>
        </div>
      </div>
    </div>
  );
};

export default Following;
