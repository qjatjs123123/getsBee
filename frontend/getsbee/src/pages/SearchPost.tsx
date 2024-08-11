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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Array<any>>([]); // 상태 추가
  const selectedPostID = useRef<null | number>(null);

  useEffect(() => {
    const queryParam = query.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [query]);

  const postLoadable = useRecoilValueLoadable(
    getPostsBySearchState({ query: searchQuery, cursor: selectedPostID.current, size: 20 }),
  );

  useEffect(() => {
    if (postLoadable.state === 'hasValue') {
      setPosts(postLoadable.contents.content || []); // 상태 업데이트
      console.log(postLoadable.contents.content);
    }
  }, [postLoadable.state, postLoadable.contents.content]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, postId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      selectedPostID.current = postId;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <SearchTab />
          <div className="flex flex-grow overflow-hidden mt-4">
            <div className="w-[460px] border-r overflow-y-auto scrollbar-hide">
              {posts.map((postData) => (
                <div
                  key={postData.post.postId}
                  className="mt-4 cursor-pointer"
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
              {searchQuery}
            </div>
            <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[110%] mt-8 mb-8">
              {selectedPostID.current && <PostDetail postId={selectedPostID.current} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
