import React from 'react';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import '../index.css';

const Following: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar />
      </div>
      <div className="flex flex-col w-4/5 ml-2">
        <div className="flex justify-end p-10 border-b">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Following;
