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
  const directories = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'Cloud' },
  ];
  const postCount = 30;

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
      <div className="w-[224px]">
        <SideBar memberId={memberId} />
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="mt-[75px] mb-[5px]">
            <DirectoryNav userName={userName} directories={directories} postCount={postCount} />
          </div>
          <div className="mb-[33px] mr-[12px]">
            <Menu />
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className="flex flex-col items-center w-[465px] p-4 border-r overflow-y-auto scrollbar-hide">
            <div>
              <h1>{isOwnHive ? 'My Hive' : `${username}'s Hive`}</h1>
              {isOwnHive ? <p>Welcome to your hive!</p> : <p>You&apos;re viewing {username}&apos;s hive.</p>}
              {/* 여기에 Hive의 내용을 표시하는 컴포넌트들을 추가하세요 */}
            </div>
            <SubSearchBar />
            {posts.map((postData) => (
              <div
                key={postData.post.postId}
                className={`mt-4 cursor-pointer ${isEditing ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => !isEditing && setSelectedPostId(postData.post.postId)}
                onKeyPress={(event) => handleKeyPress(event, postData.post.postId)}
                tabIndex={0} // This makes the div focusable
                aria-label="button"
                role="button" // This role indicates that the div is interactive
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
          <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[110%] mt-8 mb-8">
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
