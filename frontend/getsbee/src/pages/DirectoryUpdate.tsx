import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilValueLoadable, useRecoilRefresher_UNSTABLE } from 'recoil';
import { userInfoByEmailPrefixSelector } from '../recoil/userState';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import DirectoryNav from '../components/Directory/DirectoryNav';
import EditableDir from '../components/Directory/EditableDir';
// import EditableDir2 from '../components/Directory/EditableDir2';

const DirectoryUpdate: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const userInfoLoadable = useRecoilValueLoadable(userInfoByEmailPrefixSelector(username || ''));
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (userInfoLoadable.state === 'hasValue' && userInfoLoadable.contents) {
      setMemberId(userInfoLoadable.contents.memberId);
    }
  }, [userInfoLoadable.state, userInfoLoadable.contents]);

  const userName = 'HoSeok Lee'; // 예시 사용자 이름
  const directories = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'Cloud' },
  ]; // 예시 디렉토리 경로
  const postCount = 30;

  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar memberId={memberId} />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="mt-[75px] mb-[5px]">
            {/* <DirectoryNav userName={userName} directories={directories} postCount={postCount} /> */}
            <p className="text-2xl font-bold">디렉토리 수정하기</p>
          </div>
          <div className="mb-[33px] mr-[12px]">
            <Menu />
          </div>
        </div>
        <EditableDir memberId={memberId} />
        {/* <EditableDir2 memberId={4} /> */}
      </div>
    </div>
  );
};

export default DirectoryUpdate;
