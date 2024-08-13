import React, { useState, useEffect, useCallback } from 'react';
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

  const [cursor, setCursor] = useState<number | null>(987654321); // 시작 커서
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [followItems, setFollowItems] = useState<JSX.Element[]>([]);
  const [isMounted, setIsMounted] = useState(true);

  const postLoadable = useRecoilValueLoadable(getDirectoriesByQueryState({ query: keyword, cursor, size: 1 }));

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (postLoadable.state === 'hasValue' && postLoadable.contents && postLoadable.contents.data.content) {
      console.log('content.data.content: ', postLoadable.contents.data.content);

      const newItems = postLoadable.contents.data.content.map((item) => (
        <DirectorySearchItem key={item.id} item={item} />
      ));

      if (isMounted) {
        setFollowItems((prevItems) => [...prevItems, ...newItems]);

        if (postLoadable.contents.data.content.length > 0) {
          const lastItem = postLoadable.contents.data.content[postLoadable.contents.data.content.length - 1];
          const newCursor = lastItem.directory.directoryId;
          setCursor(newCursor); // 마지막 아이템 ID를 커서로 설정

          console.log('lastItemId: ', newCursor);
        } else {
          console.log('No items in content.data.content.');
          setHasMore(false); // 데이터가 없으므로 더 이상 로드할 필요 없음
        }

        // `data.last`가 true면 더 이상 로드할 데이터가 없다는 의미
        setHasMore(!postLoadable.contents.data.last);
      }
    }
  }, [postLoadable.state, postLoadable.contents, isMounted]);

  // `cursor` 값의 변화를 감지하여 로그를 찍는 useEffect
  useEffect(() => {
    console.log('cursor updated: ', cursor);
  }, [cursor]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop >= documentHeight - 1 && hasMore) {
      //has more
      // 페이지 끝에 도달했을 때 새로운 데이터 로드
      console.log('바닥에 닿음 -> 데이터 로드!');
      postLoadable;
    }
  }, [hasMore, postLoadable]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
