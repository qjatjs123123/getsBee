import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import Feed from '../components/Contents/Feed';
import FeedDetail from '../components/Contents/FeedDetail';
import honeyComb from '../assets/honeyComb.png';
import flyingbees from '../assets/flyingbees.png';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useFeedDetail } from '../hooks/useFeedDetail';
import ClipLoaderComponent from '../components/Common/ClipLoaderComponent';


const Home: React.FC = () => {
  const { feedPosts, feedLoading, hasMoreFeed, loadMoreFeedPosts, updateFeedItem } = useInfiniteScroll(10);

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const { detailItems, detailLoading, detailInitialLoading, hasMoreDetails, loadMoreDetailItems, resetAndLoadDetails } =
    useFeedDetail(selectedUrl);

  const feedObserver = useRef<IntersectionObserver | null>(null);
  const detailObserver = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (feedLoading) return;
      if (feedObserver.current) feedObserver.current.disconnect();
      feedObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreFeed) {
          loadMoreFeedPosts();
        }
      });
      if (node) feedObserver.current.observe(node);
    },
    [feedLoading, hasMoreFeed, loadMoreFeedPosts],
  );

  const lastDetailElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (detailLoading) return;
      if (detailObserver.current) detailObserver.current.disconnect();
      detailObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreDetails) {
          loadMoreDetailItems();
        }
      });
      if (node) detailObserver.current.observe(node);
    },
    [detailLoading, hasMoreDetails, loadMoreDetailItems],
  );

  const handleFeedClick = useCallback((url: string) => {
    console.log('Feed clicked:', url);
    setSelectedUrl((prevUrl) => {
      if (prevUrl !== url) {
        return url;
      }
      return prevUrl;
    });
  }, []);

  useEffect(() => {
    if (feedPosts.length > 0 && !selectedUrl) {
      console.log('Initial URL set:', feedPosts[0].post.url);
      setSelectedUrl(feedPosts[0].post.url);
    }
  }, [feedPosts, selectedUrl]);

  const memoizedDetailItems = useMemo(() => detailItems, [detailItems]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <Tab />
          <div className="flex flex-grow overflow-hidden">
            <div
              className="w-[600px] p-1 border-r overflow-y-auto scrollbar-hide flex flex-col items-center"
              style={{ height: 'calc(100vh - 100px)', paddingBottom: '2rem' }}
            >
              {feedPosts.map((item, index) => (
                <Feed
                  key={item.post.postId}
                  {...item}
                  url={item.post.url}
                  ref={index === feedPosts.length - 1 ? lastPostElementRef : undefined}
                  className={`${index > 0 ? 'mt-4' : ''} ${index === feedPosts.length - 1 ? 'mb-12' : ''} w-full mr-4 max-w-[500px] scale-103`}
                  onClick={() => handleFeedClick(item.post.url)}
                  isSelected={item.post.url === selectedUrl}
                  onUpdateFeed={updateFeedItem}
                />
              ))}
              {/* {feedLoading && <div className="text-center py-4">Loading...</div>} */}
              {feedLoading && <ClipLoaderComponent />}


              {!feedLoading && feedPosts.length === 0 && (
                <div className="text-center font-bold text-[24px] mt-[160px]">
                  <img src={flyingbees} alt="flyingbees" className='w-[200px] mb-5' />
                  <p className="flex justify-center">
                    <span className="ml-2">다른 유저들을</span>
                    <span className="ml-2 text-[#FFBF09]">팔로우</span>
                  </p>
                  <p>하고 피드를 받아보세요!</p>
                </div>
              )}
            </div>
            <div
              className="flex flex-col flex-grow p-4 items-start overflow-y-auto scrollbar-hide"
              style={{ height: 'calc(100vh - 100px)', paddingBottom: '2rem' }}
            >
              <div className="flex items-center">
                <img src={honeyComb} alt="honeyComb" className="w-9" />
                <p className="ml-1 text-[#CC9C00] font-semibold text-[22px]">Others&apos; Highlights</p>
              </div>
              {/* {detailInitialLoading && <ClipLoaderComponent />} */}
              {detailInitialLoading && <div className="text-center py-4">초기 데이터를 불러오는 중...</div>}

              {memoizedDetailItems.map((detail, index) => (
                <div
                  key={`${detail.postId}-${index}`}
                  ref={index === memoizedDetailItems.length - 1 ? lastDetailElementRef : undefined}
                  className={`border-b transform scale-[88%] w-[110%] ${
                    index === memoizedDetailItems.length - 1 ? 'mb-8' : 'mb-4'
                  }`}
                >
                  <FeedDetail detail={detail} />
                </div>
              ))}
              {detailLoading && !detailInitialLoading && <div className="text-center py-4">Loading details...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
