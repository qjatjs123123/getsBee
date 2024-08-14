import React, { useState, useEffect } from 'react';
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
  isFollowing: boolean;
  followId: number | null;
  isOwnHive: boolean;
  onFollowChange: (newFollowState: boolean, newFollowId?: number) => void;
}

const DirectoryNav: React.FC<DirectoryNavProps> = ({
  userName,
  directories,
  postCount,
  directoryId,
  isFollowing: initialIsFollowing,
  followId: initialFollowId,
  isOwnHive,
  onFollowChange,
}) => {
  const [dialogKey, setDialogKey] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followId, setFollowId] = useState(initialFollowId);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    setFollowId(initialFollowId);
  }, [initialIsFollowing, initialFollowId]);

  const handleFollowClick = () => {
    confirmDialog({
      message: isFollowing ? '이 디렉토리를 언팔로우하시겠습니까?' : '이 디렉토리를 팔로우하시겠습니까?',
      header: isFollowing ? '언팔로우' : '팔로우',
      icon: 'pi pi-exclamation-triangle',
      accept: handleConfirm,
      reject: handleReject,
      acceptLabel: '확인',
      rejectLabel: '취소',
    });
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      if (isFollowing) {
        if (followId !== null) {
          await deleteFollow(followId);
          setIsFollowing(false);
          setFollowId(null);
          onFollowChange(false);
        } else {
          console.error('followId is null');
        }
      } else {
        const response = await createFollow(directoryId);
        setIsFollowing(true);
        setFollowId(response.data.followId);
        onFollowChange(true, response.data.followId);
      }
    } catch (error) {
      console.error('Error following/unfollowing directory:', error);
    } finally {
      setIsProcessing(false);
      setDialogKey((prevKey) => prevKey + 1);
      window.location.reload();
    }
  };

  const handleReject = () => {
    setDialogKey((prevKey) => prevKey + 1);
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
      {!isOwnHive && directories.length > 0 && (
        <Button
          label={isFollowing ? '팔로잉' : '팔로우'}
          icon={isFollowing ? 'pi pi-check' : 'pi pi-plus'}
          className={`px-3 py-1 rounded-md text-sm ${
            isFollowing
              ? 'font-bold bg-gray-300 text-gray-700 border-2 border-gray-300 hover:bg-gray-400'
              : 'font-bold bg-[#FFBF09] border-2 border-[#FFBF09] shadow-none hover:bg-[#E5AB08]'
          }`}
          onClick={handleFollowClick}
          disabled={isProcessing}
        />
      )}
      {/* <ConfirmDialog key={dialogKey} /> */}
    </div>
  );
};

export default DirectoryNav;
