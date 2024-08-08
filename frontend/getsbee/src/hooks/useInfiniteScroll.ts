import { useState, useEffect, useCallback } from 'react';
import { FeedItem, fetchPosts } from '../api/FeedAPI';

export const useInfiniteScroll = (initialSize: number = 20) => {
  const [posts, setPosts] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchPosts(cursor, initialSize);
      const newPosts = response.data.content;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);

      if (newPosts.length > 0) {
        setCursor(newPosts[newPosts.length - 1].post.postId);
      }

      setHasMore(newPosts.length === initialSize);

      // 디버깅을 위한 로그
      console.log('Fetched posts:', newPosts.length);
      console.log('Total posts:', posts.length + newPosts.length);
      console.log('Next cursor:', newPosts.length > 0 ? newPosts[newPosts.length - 1].post.postId : null);
      console.log('Has more:', newPosts.length === initialSize);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore, initialSize]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  return {
    feedPosts: posts,
    feedLoading: loading,
    hasMoreFeed: hasMore,
    loadMoreFeedPosts: loadMorePosts,
  };
};
