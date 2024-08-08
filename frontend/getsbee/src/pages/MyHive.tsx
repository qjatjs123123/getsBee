import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
// eslint-disable-next-line camelcase
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { userState } from '../recoil/userState';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import SubSearchBar from '../components/Common/SubSearchBar';
import DirectoryNav from '../components/Directory/DirectoryNav';
import { getPostsByDirectoryState } from '../recoil/PostState';

const MyHive: React.FC = () => {
  const { username } = useParams();
  const currentUser = useRecoilValue(userState);

  const isOwnHive = currentUser?.email.split('@')[0] === username;

  const userName = 'HoSeok Lee'; // 예시 사용자 이름
  const directories = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'Cloud' },
  ]; // 예시 디렉토리 경로
  const postCount = 30;

  const postLoadable = useRecoilValueLoadable(getPostsByDirectoryState({ directoryId: 5, size: 10 }));
  const refreshPosts = useRecoilRefresher_UNSTABLE(getPostsByDirectoryState({ directoryId: 5, size: 10 }));
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    if (postLoadable.state === 'hasValue' && postLoadable.contents.content.length > 0) {
      setSelectedPostId(postLoadable.contents.content[0].post.postId);
    }
  }, [postLoadable.state]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, postId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setSelectedPostId(postId);
    }
  };

  const handlePostDeleted = useCallback(() => {
    refreshPosts();
    setSelectedPostId(null); // Optionally reset the selected post ID
  }, [refreshPosts]);

  if (postLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (postLoadable.state === 'hasError') {
    return <div>Error: {postLoadable.contents}</div>;
  }

  const posts = postLoadable.contents.content;

  return (
    <div className="flex h-screen">
      <div className="w-[224px]">
        <SideBar />
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
              {isOwnHive ? <p>Welcome to your hive!</p> : <p>You're viewing {username}'s hive.</p>}
              {/* 여기에 Hive의 내용을 표시하는 컴포넌트들을 추가하세요 */}
            </div>
            <SubSearchBar />
            {posts.map((postData) => (
              <div
                key={postData.post.postId}
                className="mt-4 cursor-pointer"
                onClick={() => setSelectedPostId(postData.post.postId)}
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
            {selectedPostId && <PostDetail postId={selectedPostId} onDelete={handlePostDeleted} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHive;
