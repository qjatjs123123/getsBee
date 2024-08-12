import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilValueLoadable, useRecoilRefresher_UNSTABLE } from 'recoil';
import { userInfoByEmailPrefixSelector } from '../recoil/userState';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import folderIcon from '../assets/folderIcon.png';
import DirectoryNav from '../components/Directory/DirectoryNav';
import EditableDir from '../components/Directory/EditableDir';

const DirectoryUpdate: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const userInfoLoadable = useRecoilValueLoadable(userInfoByEmailPrefixSelector(username || ''));
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (userInfoLoadable.state === 'hasValue' && userInfoLoadable.contents) {
      setMemberId(userInfoLoadable.contents.memberId);
    }
  }, [userInfoLoadable.state, userInfoLoadable.contents]);

  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar memberId={memberId} isOwnHive={true} />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="flex items-center space-x-2 mt-[75px] mb-[5px]">
            <img src={folderIcon} alt="Folder" className="w-6 h-5" />
            <p className="text-[#CC9C00] text-[24px] ml-2 font-bold">디렉토리 수정</p>
          </div>
          <div className="mb-[33px] mr-[12px]">
            <Menu />
          </div>
        </div>
        <EditableDir memberId={memberId} />
      </div>
    </div>
  );
};

export default DirectoryUpdate;
