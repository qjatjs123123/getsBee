import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line camelcase
import { useRecoilValueLoadable, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { userState, userInfoByEmailPrefixSelector } from '../recoil/userState';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import SubSearchBar from '../components/Common/SubSearchBar';
import DirectoryNav from '../components/Directory/DirectoryNav';
import { getPostsByMemberState } from '../recoil/PostState';

const MyHive: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useRecoilValue(userState);
  const isOwnHive = currentUser?.email.split('@')[0] === username;
  const userInfoLoadable = useRecoilValueLoadable(userInfoByEmailPrefixSelector(username || ''));
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (userInfoLoadable.state === 'hasValue' && userInfoLoadable.contents) {
      setMemberId(userInfoLoadable.contents.memberId);
    }
  }, [userInfoLoadable.state, userInfoLoadable.contents]);

  const userName = username;
  const directories = [];

  const postLoadable = useRecoilValueLoadable(getPostsByMemberState({ memberId: memberId || 0, size: 10 }));
  const refreshPosts = useRecoilRefresher_UNSTABLE(getPostsByMemberState({ memberId: memberId || 0, size: 10 }));

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (postLoadable.state === 'hasValue' && postLoadable.contents.content.length > 0) {
      setSelectedPostId(postLoadable.contents.content[0].post.postId);
    }
  }, [postLoadable.state, postLoadable.contents]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, postId: number) => {
    if (!isEditing && (event.key === 'Enter' || event.key === ' ')) {
      setSelectedPostId(postId);
    }
  };

  const handlePostDeleted = useCallback(() => {
    refreshPosts();
    setSelectedPostId(null);
  }, [refreshPosts]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  if (userInfoLoadable.state === 'loading' || postLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (userInfoLoadable.state === 'hasError' || postLoadable.state === 'hasError') {
    return <div>Error: {postLoadable.contents}</div>;
  }

  const posts = postLoadable.contents.content;

  return (
    <div className="flex h-screen">
      <div className="w-56">
        <SideBar memberId={memberId} isOwnHive={isOwnHive} />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="mt-[75px] mb-[5px]">
            <DirectoryNav
              userName={userName}
              directories={directories}
              postCount={posts.length}
              isOwnHive={true}
              directoryId={0}
            />
          </div>
          <div className="mb-[33px] mr-3">
            <Menu />
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className="flex flex-col items-center w-[465px] p-4 border-r overflow-y-auto scrollbar-hide">
            <SubSearchBar />
            {posts.map((postData) => (
              <div
                key={postData.post.postId}
                className={`mt-4 cursor-pointer ${
                  selectedPostId === postData.post.postId
                    ? 'border-[3px] border-[#FFC60A] border rounded-[16px]'
                    : 'bg-white'
                } ${isEditing ? 'pointer-events-none opacity-50' : ''}`}
                style={{
                  boxShadow: selectedPostId === postData.post.postId ? '0 0 10px rgba(255, 198, 10, 0.5)' : 'none',
                  transition: 'border-color 0.3s, border-width 0.3s, box-shadow 0.3s',
                }}
                onClick={() => !isEditing && setSelectedPostId(postData.post.postId)}
                onKeyPress={(event) => handleKeyPress(event, postData.post.postId)}
                tabIndex={0}
                aria-label="button"
                role="button"
              >
                <Post
                  title={postData.post.title}
                  url={postData.post.url}
                  thumbnail={postData.post.thumbnail}
                  viewCount={postData.post.viewCount}
                  directoryName={postData.directory.directoryName}
                  createdAt={postData.post.createdAt}
                  highlightColors={postData.highlight.highlightColors}
                  highlightNumber={postData.highlight.highlightNumber}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-110 mt-8 mb-8">
            {selectedPostId && (
              <PostDetail
                postId={selectedPostId}
                onDelete={handlePostDeleted}
                onStartEditing={handleStartEditing}
                onStopEditing={handleStopEditing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHive;
