import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import SearchTab from '../components/Common/SearchTab';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import { getPostsByDirectoryState } from '../recoil/PostState';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPost: React.FC = () => {
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const queryParam = query.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [query]);

  const postLoadable = useRecoilValueLoadable(getPostsByDirectoryState({ directoryId: 5, size: 10 }));
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

  if (postLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (postLoadable.state === 'hasError') {
    return <div>Error: {postLoadable.contents}</div>;
  }

  const posts = postLoadable.contents.content;

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
              {searchQuery}
            </div>
            <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[110%] mt-8 mb-8">
              {selectedPostId && <PostDetail postId={selectedPostId} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
