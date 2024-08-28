import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import SearchTab from '../components/Common/SearchTab';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import { getPostsBySearchState } from '../recoil/PostState';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPost: React.FC = () => {
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const [posts, setPosts] = useState<Array<any>>([]);
  const [selectedPostID, setSelectedPostID] = useState<null | number>(null);
  const [cursorID, setCursorID] = useState<null | number>(null);
  const initialLoad = useRef<boolean>(true);
  const postsContainerRef = useRef<HTMLDivElement>(null);

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

  const postLoadable = useRecoilValueLoadable(
    getPostsBySearchState({ query: searchQuery, cursor: cursorID, size: 20 }),
  );

  useEffect(() => {
    const queryParam = query.get('query');
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      initialLoad.current = true;
      setCursorID(null);

      if (postsContainerRef.current) {
        postsContainerRef.current.scrollTop = 0;
      }
    }
  }, [query]);

  useEffect(() => {
    if (initialLoad.current && postLoadable.state === 'hasValue') {
      const newPosts = postLoadable.contents.content || [];
      setPosts(newPosts);

      // posts 배열이 비어있지 않으면 첫 번째 post의 ID를 선택
      if (newPosts.length > 0) {
        setSelectedPostID(newPosts[0].post.postId);
      }

      initialLoad.current = false;
    } else {
      // Pagination: append new posts
      setPosts((prevPosts) => [...prevPosts, ...(postLoadable.contents.content || [])]);
    }
  }, [postLoadable.state]);

  const handleClick = (postId: number) => {
    setSelectedPostID(postId);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <SearchTab />
          <div className="flex flex-grow overflow-hidden mt-4">
            <div ref={postsContainerRef} className="w-[460px] border-r overflow-y-auto scrollbar-hide">
              {posts.map((postData) => (
                <div
                  key={postData.post.postId}
                  className="mt-4 cursor-pointer"
                  onClick={() => handleClick(postData.post.postId)}
                  tabIndex={0} // This makes the div focusable
                  aria-label="button"
                  role="button" // This role indicates that the div is interactive
                >
                  <div
                    className={`w-[405px] ${
                      selectedPostID === postData.post.postId
                        ? 'border-[3px] border-[#FFC60A] border rounded-[16px]'
                        : 'bg-white'
                    }`}
                    style={{
                      boxShadow: selectedPostID === postData.post.postId ? '0 0 10px rgba(255, 198, 10, 0.5)' : 'none',
                      transition: 'border-color 0.3s, border-width 0.3s, box-shadow 0.3s',
                    }}
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
                </div>
              ))}
            </div>
            <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[110%] mt-8 mb-8">
              {selectedPostID && <PostDetail postId={selectedPostID} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
