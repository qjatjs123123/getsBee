import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import SearchTab from '../components/Common/SearchTab';
import Post from '../components/Contents/Post';
import PostDetail from '../components/Contents/PostDetail';
import '../index.css';

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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <SearchTab />
          <div className="flex flex-grow overflow-hidden mt-4">
            <div className="w-[460px] border-r overflow-y-auto scrollbar-hide">
              <Post />
              <div className="mt-4">
                <Post />
              </div>
              <div className="mt-4">
                <Post />
              </div>
              <div className="mt-4 mb-4">
                <Post />
              </div>
              {searchQuery}
            </div>
            <div className="flex flex-grow justify-center items-start overflow-y-auto scrollbar-hide transform scale-[120%] mt-[30px] mb-[40px]">
              <PostDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
