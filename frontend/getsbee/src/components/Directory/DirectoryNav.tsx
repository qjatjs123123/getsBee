import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import folderIcon from '../../assets/folderIcon.png';
import { createFollow, deleteFollow } from '../../api/FollowingListApi';

interface DirectoryNavProps {
  userName: string;
  directories: { id: string; name: string; directoryId: string }[];
  postCount: number;
  directoryId: number;
  initialIsFollowing: boolean;
  isOwnHive: boolean;
}

const DirectoryNav: React.FC<DirectoryNavProps> = ({
  userName,
  directories,
  postCount,
  directoryId,
  initialIsFollowing,
  isOwnHive,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const { username } = useParams<{ username: string }>();

  const handleFollowClick = () => {
    confirmDialog({
      message: isFollowing ? '이 디렉토리를 언팔로우하시겠습니까?' : '이 디렉토리를 팔로우하시겠습니까?',
      header: isFollowing ? '언팔로우' : '팔로우',
      icon: 'pi pi-exclamation-triangle',
      accept: handleConfirm,
      reject: () => {},
      acceptLabel: '확인',
      rejectLabel: '취소',
    });
  };

  const handleConfirm = async () => {
    try {
      if (isFollowing) {
        await deleteFollow(directoryId);
      } else {
        await createFollow(directoryId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error following/unfollowing directory:', error);
      // 에러 처리 로직 (예: 사용자에게 알림)
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <img src={folderIcon} alt="Folder" className="w-6 h-5" />
      <Link to={`/myhive/${username}`} className="text-xl font-bold text-gray-500 hover:underline">
        {userName}&apos;s
      </Link>
      {directories.map((dir, index) => (
        <React.Fragment key={dir.id}>
          <span className="text-xl font-bold text-gray-500">&gt;</span>
          <Link
            to={`/myhive/${username}/${dir.directoryId}`}
            className={`text-xl font-bold ${
              index === directories.length - 1 ? 'text-gray-800' : 'text-gray-500'
            } hover:underline`}
          >
            {dir.name}
          </Link>
        </React.Fragment>
      ))}
      <span className="font-bold text-gray-800">({postCount})</span>
      {!isOwnHive && (
        <Button
          label={isFollowing ? '팔로잉' : '팔로우'}
          icon={isFollowing ? 'pi pi-check' : 'pi pi-plus'}
          className={`ml-4 ${isFollowing ? 'p-button-outlined' : 'p-button-primary'}`}
          onClick={handleFollowClick}
        />
      )}
      <ConfirmDialog />
    </div>
  );
};

export default DirectoryNav;
