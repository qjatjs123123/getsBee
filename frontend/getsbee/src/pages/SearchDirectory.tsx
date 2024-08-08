import React, { useState, useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import SearchTab from '../components/Common/SearchTab';
import DirectorySearchItem from '../components/Common/DirectorySearchItem';
import { getDirectoriesByQueryState } from '../recoil/directorySearchState';

// URL에서 쿼리 매개변수를 추출하는 커스텀 훅
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchDirectory: React.FC = () => {
  const searchQuery = useQuery();
  const keyword = searchQuery.get('query');

  const postLoadable = useRecoilValueLoadable(getDirectoriesByQueryState({ query: keyword, cursor: 1000, size: 10 }));
  console.log(postLoadable);

  // 검색 결과를 저장할 상태 정의
  const [followItems, setFollowItems] = useState<JSX.Element[]>([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // 검색 결과를 상태에 저장
  useEffect(() => {
    if (postLoadable.state === 'hasValue' && postLoadable.contents && postLoadable.contents.data.content) {
      const items = postLoadable.contents.data.content.map((item, index) => <DirectorySearchItem key={index} item={item} />);
      if (isMounted) {
        setFollowItems(items);
      }
    }
  }, [postLoadable.state, postLoadable.contents, isMounted]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <SearchTab />
          <div className="mt-5">
            <div className="flex grid lg:grid-cols-4 lg:gap-2 md:grid-cols-2 md:gap-1">{followItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDirectory;
