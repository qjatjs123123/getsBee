import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { useRecoilValueLoadable } from 'recoil';
import { Tooltip } from 'primereact/tooltip';  // Tooltip 컴포넌트 추가
import logoIcon from '../../assets/logoIcon.png';
import settingIcon from '../../assets/settingIcon.png';
import Directory from '../Directory/Directory';
import { userInfoByIdSelector, userHiveInfoByIdSelector } from '../../recoil/userState';
import { getDirectoryState } from '../../recoil/DirectoryState';

interface SideBarProps {
  memberId: number | null;
  isOwnHive: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ memberId, isOwnHive }) => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const userInfoLoadable = useRecoilValueLoadable(userInfoByIdSelector(memberId || 0));
  const hiveInfoLoadable = useRecoilValueLoadable(userHiveInfoByIdSelector(memberId || 0));
  const directoriesLoadable = useRecoilValueLoadable(getDirectoryState(memberId || 0));

  const [bookmarkId, setBookmarkId] = useState<number | null>(null);
  const [tempCount, setTempCount] = useState<number | 0>(0);

  const userInfo = userInfoLoadable.state === 'hasValue' ? userInfoLoadable.contents : null;
  const hiveInfo = hiveInfoLoadable.state === 'hasValue' ? hiveInfoLoadable.contents : null;
  const directories = directoriesLoadable.state === 'hasValue' ? directoriesLoadable.contents : null;

  useEffect(() => {
    if (directories) {
      const bookmarkDirectory = directories.find((directory) => directory.name === 'Bookmark');
      if (bookmarkDirectory) {
        setBookmarkId(bookmarkDirectory.directoryId); // Bookmark 디렉토리의 ID를 상태에 저장
      }
      setTempCount(directories[0].postCount);
    }
  }, [directories]);

  const handleBookmarkClick = () => {
    if (username && bookmarkId) {
      navigate(`/myhive/${username}/${bookmarkId}`);
    }
  };

  const handleSettingClick = () => {
    if (username) {
      navigate(`/myhive/${username}/update`);
    }
  };

  return (
    <aside className="fixed h-full w-[224px] bg-[#fff6e3] rounded-r-[28px] flex flex-col justify-between">
      <div>
        <Link to="/" className="flex items-center ml-[20px] mt-[24px] font-bold">
          <img className="w-[140px] mr-[12px]" src={logoIcon} alt="beeIcon" />
        </Link>
        <div className="flex flex-col items-center mt-6">
          {userInfo ? (
            <>
              <Avatar image={userInfo.picture} size="large" shape="circle" className="w-[80px] h-[80px]" />
              <div className="mt-1 text-[19px] font-bold" style={{ color: '#253746' }}>
                {username}
              </div>
              {hiveInfo && (
                <div className="mt-3 flex space-x-6">
                  <div className="text-center">
                    <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
                      {hiveInfo.postNumber}
                    </p>
                    <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
                      게시글
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
                      {hiveInfo.follower}
                    </p>
                    <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
                      팔로워
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-bold" style={{ color: '#2D2C38' }}>
                      {hiveInfo.following}
                    </p>
                    <p className="text-[11px] font-semibold" style={{ color: '#5C5C5C' }}>
                      팔로잉
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
          <hr className="w-[80%] mt-5" style={{ borderTop: '1px solid #EDDEEA' }} />
        </div>
        <div className="mt-3 px-8 overflow-y-auto scrollbar-hide h-[calc(100vh-340px)]">
          {userInfo ? (
            <div className="text-[20px] font-bold" style={{ color: '#253746' }}>
              {username}&apos;s
            </div>
          ) : (
            <div>Loading...</div>
          )}
          {Array.isArray(directories) && directories.length > 0 ? (
            directories
              .filter((directory) => directory.name !== 'Bookmark')
              .map((directory) => (
                <Directory
                  key={directory.directoryId}
                  directory={directory}
                  username={username || ''}
                  tempCount={tempCount}
                />
              ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {isOwnHive && (
        <>
          <hr className="w-[80%] ml-[20px] mt-[12px]" style={{ borderTop: '1px solid #EDDEEA' }} />
          <div className="p-5 pt-3 flex justify-between">
            <i
              className="pi pi-bookmark text-[#FFD233] hover:text-[#C09500] cursor-pointer mt-1"
              title="Bookmark"
              style={{ fontSize: '23px' }}
              onClick={handleBookmarkClick}
            />
            <img
              id="setting-icon"
              className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
              src={settingIcon}
              alt="settingIcon"
              onClick={handleSettingClick}
              data-pr-tooltip="디렉토리를 수정할 수 있어요!"
              data-pr-position="top"
            />
            <Tooltip target="#setting-icon" />
          </div>
        </>
      )}
    </aside>
  );
};

export default SideBar;
