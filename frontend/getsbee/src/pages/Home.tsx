import React, { useRef, useCallback } from 'react';
import Header from '../components/Common/Header';
import Tab from '../components/Common/Tab';
import Feed from '../components/Contents/Feed';
import FeedDetail from '../components/Contents/FeedDetail';
import honeyComb from '../assets/honeyComb.png';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const Home: React.FC = () => {
  const { posts, loading, hasMore, loadMorePosts } = useInfiniteScroll(10); // 초기 size를 10으로 설정
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePosts],
  );

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center flex-grow overflow-hidden">
        <div className="w-[80%] flex flex-col">
          <Tab />
          <div className="flex flex-grow overflow-hidden">
            <div className="w-[600px] p-1 border-r overflow-y-auto scrollbar-hide">
              {posts.map((item, index) => (
                <Feed
                  key={item.post.postId}
                  {...item}
                  ref={index === posts.length - 1 ? lastPostElementRef : undefined}
                  className={index > 0 ? 'mt-4' : ''}
                />
              ))}
              {loading && <div className="text-center py-4">Loading...</div>}
              {/* {!loading && !hasMore && posts.length > 0 && (
                <div className="text-center py-4">더 이상 포스트가 없습니다.</div>
              )} */}
              {!loading && posts.length === 0 && <div className="text-center py-4">포스트가 없습니다.</div>}
            </div>
            <div className="flex flex-col flex-grow p-4 items-start overflow-y-auto scrollbar-hide">
              <div className="flex items-center">
                <img src={honeyComb} alt="honeyComb" className="w-9" />
                <p className="ml-1 text-[#CC9C00] font-semibold text-[22px]">Others&apos; Highlights</p>
              </div>
              <div className="border-b transform scale-[95%]">
                <FeedDetail />
              </div>
              <div className="border-b transform scale-[95%]">
                <FeedDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
