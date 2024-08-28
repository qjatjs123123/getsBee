import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPosts, FeedDetailItem } from '../api/FeedDetailAPI';

export const useFeedDetail = (url: string | null, initialSize: number = 20) => {
  const [details, setDetails] = useState<FeedDetailItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);

  const prevUrlRef = useRef<string | null>(null);

  const loadDetails = useCallback(
    async (isInitialLoad: boolean = false) => {
      if (!url) return;
      if (isInitialLoad && url === prevUrlRef.current) return;

      setLoading(true);
      if (isInitialLoad) {
        setInitialLoading(true);
        setCursor(null);
        setDetails([]); // Clear previous details when loading new URL
      }

      try {
        const response = await fetchPosts(url, isInitialLoad ? null : cursor, initialSize);
        const newDetails = response.data.content;

        setDetails((prevDetails) => {
          if (isInitialLoad) {
            return newDetails;
          } else {
            const uniqueNewDetails = newDetails.filter(
              (newDetail) => !prevDetails.some((prevDetail) => prevDetail.postId === newDetail.postId),
            );
            return [...prevDetails, ...uniqueNewDetails];
          }
        });

        setCursor(newDetails.length > 0 ? newDetails[newDetails.length - 1].postId : null);
        setHasMore(newDetails.length === initialSize);

        if (isInitialLoad) {
          prevUrlRef.current = url;
        }
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
    [url, initialSize],
  );

  useEffect(() => {
    if (url && url !== prevUrlRef.current) {
      loadDetails(true);
    }
  }, [url, loadDetails]);

  const resetAndLoadDetails = useCallback(() => {
    if (url !== prevUrlRef.current) {
      loadDetails(true);
    }
  }, [url, loadDetails]);

  return {
    detailItems: details,
    detailLoading: loading,
    detailInitialLoading: initialLoading,
    hasMoreDetails: hasMore,
    loadMoreDetailItems: () => loadDetails(false),
    resetAndLoadDetails,
  };
};
