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
  const initialLoad = useRef<boolean>(true);

  useEffect(() => {
    const queryParam = query.get('query');
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      initialLoad.current = true;
    }
  }, [query]);

  const postLoadable = useRecoilValueLoadable(
    getPostsBySearchState({ query: searchQuery, cursor: selectedPostID, size: 20 }),
  );

  useEffect(() => {
    if (initialLoad.current && postLoadable.state === 'hasValue') {
      setPosts(postLoadable.contents.content || []);
      setSelectedPostID(postLoadable.contents.content[0].post.postId);
      initialLoad.current = false;
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
            <div className="w-[460px] border-r overflow-y-auto scrollbar-hide">
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
                    />
                  </div>
                </div>
              ))}
              {searchQuery}
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
