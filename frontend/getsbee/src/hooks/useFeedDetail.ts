import { useState, useEffect, useCallback } from 'react';
import { fetchPosts, FeedDetailItem } from '../api/FeedDetailAPI';

export const useFeedDetail = (url: string | null, initialSize: number = 20) => {
  const [details, setDetails] = useState<FeedDetailItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);

  const loadDetails = useCallback(
    async (isInitialLoad: boolean = false) => {
      if (!url) return;

      setLoading(true);
      if (isInitialLoad) {
        setInitialLoading(true);
        setCursor(null);
      }

      try {
        const response = await fetchPosts(url, isInitialLoad ? null : cursor, initialSize);
        const newDetails = response.data.content;

        setDetails((prevDetails) => (isInitialLoad ? newDetails : [...prevDetails, ...newDetails]));
        setCursor(newDetails.length > 0 ? newDetails[newDetails.length - 1].postId : null);
        setHasMore(newDetails.length === initialSize);
      } catch (error) {
        console.error('Error in loadDetails:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
        if (isInitialLoad) {
          setInitialLoading(false);
        }
      }
    },
    [url, initialSize, cursor],
  );

  useEffect(() => {
    if (url) {
      loadDetails(true);
    }
  }, [url]);

  return {
    detailItems: details,
    detailLoading: loading,
    detailInitialLoading: initialLoading,
    hasMoreDetails: hasMore,
    loadMoreDetailItems: () => loadDetails(false),
    resetAndLoadDetails: () => loadDetails(true),
  };
};
