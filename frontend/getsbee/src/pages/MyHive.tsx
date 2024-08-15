import React, { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line camelcase
import { useRecoilValueLoadable, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { userState, userInfoByEmailPrefixSelector } from '../recoil/userState';
import SideBar from '../components/Common/SideBar';
import Menu from '../components/Common/Menu';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import DirectoryNav from '../components/Directory/DirectoryNav';
import { getPostsByMemberState } from '../recoil/PostState';
import { userHiveInfoByIdSelector } from '../recoil/userState';

const MyHive: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useRecoilValue(userState);
  const isOwnHive = currentUser?.email.split('@')[0] === username;
  const userInfoLoadable = useRecoilValueLoadable(userInfoByEmailPrefixSelector(username || ''));
  const [memberId, setMemberId] = useState<number | null>(null);
  const [hiveInfo, setHiveInfo] = useState<any | null>(null);

  //무한스크롤
  const initialLoad = useRef<boolean>(true);
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const [cursorID, setCursorID] = useState<null | number>(null);
  const [posts, setPosts] = useState<Array<any>>([]);
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const [isBalloonVisible, setIsBalloonVisible] = useState(true);

  const postLoadable = useRecoilValueLoadable(
    getPostsByMemberState({ memberId: memberId || 0, cursor: cursorID, size: 10 }),
  );

  const handleScroll = () => {
    if (postsContainerRef.current) {
      const container = postsContainerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setCursorID(posts[posts.length - 1]?.post.postId || null);
      }
    }
  };

  useEffect(() => {
    const container = postsContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  useEffect(() => {
    console.log(postLoadable.contents.content);
    if (initialLoad.current && postLoadable.state === 'hasValue') {
      const newPosts = postLoadable.contents.content || [];
      console.log(newPosts);
      setPosts(newPosts);
      // posts 배열이 비어있지 않으면 첫 번째 post의 ID를 선택
      if (newPosts.length > 0) {
        setSelectedPostId(newPosts[0].post.postId);
      }

      initialLoad.current = false;
    } else {
      // Pagination: append new posts
      setPosts((prevPosts) => [...prevPosts, ...(postLoadable.contents.content || [])]);
      const newPosts = postLoadable.contents.content || [];
      console.log(newPosts);
      if (!selectedPostId && newPosts.length > 0) {
        setSelectedPostId(newPosts[0].post.postId);
      }
    }
  }, [postLoadable.state, memberId, postLoadable.contents.content]);

  ////////////////////
  useEffect(() => {
    if (userInfoLoadable.state === 'hasValue' && userInfoLoadable.contents) {
      setMemberId(userInfoLoadable.contents.memberId);
    }
  }, [userInfoLoadable.state, userInfoLoadable.contents]);

  const hiveInfoLoadable = useRecoilValueLoadable(userHiveInfoByIdSelector(memberId || 0));

  useEffect(() => {
    if (memberId !== null && hiveInfoLoadable.state === 'hasValue') {
      setHiveInfo(hiveInfoLoadable.contents);
    }
  }, [memberId, hiveInfoLoadable.state, hiveInfoLoadable.contents]);

  const userName = username;
  const directories = [];

  // const postLoadable = useRecoilValueLoadable(getPosts
  //   ByMemberState({ memberId: memberId || 0, size: 10 }));
  // const refreshPosts = useRecoilRefresher_UNSTABLE(getPostsByMemberState({ memberId: memberId || 0, size: 10 }));

  // const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   if (postLoadable.state === 'hasValue' && postLoadable.contents.content.length > 0) {
  //     setSelectedPostId(postLoadable.contents.content[0].post.postId);
  //   }
  // }, [postLoadable.state, postLoadable.contents]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, postId: number) => {
    if (!isEditing && (event.key === 'Enter' || event.key === ' ')) {
      setSelectedPostId(postId);
    }
  };

  const handlePostDeleted = () => {
    const newPost = posts.filter((data) => {
      return data.post.postId !== selectedPostId;
    });
    setPosts(newPost);
    setSelectedPostId(null);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const handleCloseBalloon = () => {
    setIsBalloonVisible(false);
  };

  // if (userInfoLoadable.state === 'loading' || postLoadable.state === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (userInfoLoadable.state === 'hasError' || postLoadable.state === 'hasError') {
  //   return <div>Error: {postLoadable.contents}</div>;
  // }

  // const posts = postLoadable.contents.content;

  return (
    <div className="flex h-screen">
      <div className="w-56 z-20">
        <SideBar memberId={memberId} isOwnHive={isOwnHive} />
        {!isOwnHive && isBalloonVisible && (
          <div className="absolute top-[250px] left-[140px] w-[135px] p-3 bg-yellow-200 text-black rounded-lg shadow-lg">
            <button className="absolute top-[1px] right-[6px] text-black" onClick={handleCloseBalloon}>
              <i className="pi pi-times" style={{ fontSize: '0.7rem' }}></i>
            </button>
            <p className="text-[12px]">
              디렉토리 이동해서 <br></br>팔로우를 해보세요!
            </p>
            <div className="absolute top-[50%] left-[-10px] transform -translate-y-1/2 border-[10px] border-transparent border-r-yellow-200"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-5/6 ml-2">
        <div className="flex justify-between items-center border-b ml-6">
          <div className="mt-[75px] mb-[5px]">
            {hiveInfo && (
              <DirectoryNav
                userName={userName}
                directories={directories}
                postCount={hiveInfo?.postNumber ?? 0}
                isOwnHive={true}
                directoryId={0}
              />
            )}
          </div>
          <div className="mb-[33px] mr-3">
            <Menu />
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div
            ref={postsContainerRef}
            className="flex flex-col items-center w-[465px] bg-white p-4 border-r overflow-y-auto scrollbar-hide z-10"
          >
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
                  memberEmail={postData.member.memberEmail}
                  directoryId={postData.directory.directoryId}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-110 mt-8 mb-8 z-0">
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
