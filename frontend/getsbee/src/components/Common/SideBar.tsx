import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import logoIcon from '../../assets/logoIcon.png';
import settingIcon from '../../assets/settingIcon.png';
import Directory from '../Directory/Directory';
import '../../index.css';

const SideBar: React.FC = () => {
  const directories = [
    {
      directoryId: 2,
      name: 'Temporary',
      depth: 1,
      prevDirectoryId: null,
      nextDirectoryId: 3,
      parentDirectoryId: 1,
      memberId: 123,
      children: [],
    },
    {
      directoryId: 3,
      name: 'Bookmark',
      depth: 1,
      prevDirectoryId: 2,
      nextDirectoryId: 4,
      parentDirectoryId: 1,
      memberId: 123,
      children: [],
    },
    {
      directoryId: 4,
      name: 'IT',
      depth: 1,
      prevDirectoryId: 3,
      nextDirectoryId: 9,
      parentDirectoryId: 1,
      memberId: 123,
      children: [
        {
          directoryId: 5,
          name: 'SpringBoot',
          depth: 2,
          prevDirectoryId: null,
          nextDirectoryId: 6,
          parentDirectoryId: 4,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 6,
          name: 'MongoDB',
          depth: 2,
          prevDirectoryId: 5,
          nextDirectoryId: 7,
          parentDirectoryId: 4,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 7,
          name: 'Cloud',
          depth: 2,
          prevDirectoryId: 6,
          nextDirectoryId: 8,
          parentDirectoryId: 4,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 8,
          name: 'BlockChain',
          depth: 2,
          prevDirectoryId: 7,
          nextDirectoryId: null,
          parentDirectoryId: 4,
          memberId: 123,
          children: [],
        },
      ],
    },
    {
      directoryId: 9,
      name: 'Financial Sector',
      depth: 1,
      prevDirectoryId: 4,
      nextDirectoryId: 13,
      parentDirectoryId: 1,
      memberId: 123,
      children: [
        {
          directoryId: 10,
          name: 'Bank',
          depth: 2,
          prevDirectoryId: null,
          nextDirectoryId: 11,
          parentDirectoryId: 9,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 11,
          name: 'Insurance',
          depth: 2,
          prevDirectoryId: 10,
          nextDirectoryId: 12,
          parentDirectoryId: 9,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 12,
          name: 'New Service',
          depth: 2,
          prevDirectoryId: 11,
          nextDirectoryId: null,
          parentDirectoryId: 9,
          memberId: 123,
          children: [],
        },
      ],
    },
    {
      directoryId: 13,
      name: "What's new",
      depth: 1,
      prevDirectoryId: 9,
      nextDirectoryId: null,
      parentDirectoryId: 1,
      memberId: 123,
      children: [
        {
          directoryId: 14,
          name: 'IT',
          depth: 2,
          prevDirectoryId: null,
          nextDirectoryId: 15,
          parentDirectoryId: 13,
          memberId: 123,
          children: [],
        },
        {
          directoryId: 15,
          name: 'Service',
          depth: 2,
          prevDirectoryId: 14,
          nextDirectoryId: null,
          parentDirectoryId: 13,
          memberId: 123,
          children: [],
        },
      ],
    },
  ];

  const user = {
    avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    name: 'Hoseok Lee',
    post: '5',
    following: '120',
    follower: '84',
  };

  return (
    <aside className="fixed h-full w-[224px] bg-[#fff6e3] rounded-r-[28px] flex flex-col">
      <Link to="/" className="flex items-center ml-[20px] mt-[24px] font-bold">
        <img className="w-[140px] mr-[12px]" src={logoIcon} alt="beeIcon" />
      </Link>
      <div className="flex flex-col items-center mt-6">
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
      <div className="mt-3 flexflex-col items-start px-8 overflow-y-auto scrollbar-hide">
        <div className="text-[20px] font-bold" style={{ color: '#253746' }}>
          {user.name}&apos;s
        </div>
        {directories.map((directory) => (
          <Directory key={directory.directoryId} directory={directory} />
        ))}
        <div className="flex justify-end mt-3 mb-3">
          <img className="w-[32px] h-[32px]" src={settingIcon} alt="settingIcon" />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
