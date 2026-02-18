/* eslint-disable react-hooks/exhaustive-deps */
import {APICacheKeys} from 'helpers/api/api.types';
import {APIHelper} from 'helpers/api/ApiHelper';
import {useState, useCallback, useRef, useEffect} from 'react';

interface UsePaginationProps<T> {
  fetch: (page: number, limit: number) => Promise<T[] | undefined>;
  limit?: number;
  enable?: boolean; // Enable first fetch on mount
  cacheKeys?: APICacheKeys[]; // Assuming APICacheKeys is a string for simplicity
}

interface UsePaginationResult<T> {
  data: T[];
  fetchNext: () => Promise<void>;
  refresh: () => Promise<void>;
  isLoading: boolean;
  isRefreshing: boolean;
  isMoreLoading: boolean;
  hasMore: boolean;
}

function usePagination<T>({
  fetch,
  limit = 10,
  enable = true,
  cacheKeys,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [isInit, setIsInit] = useState(false);

  const pageRef = useRef<number>(1);
  const loadingRef = useRef(false);

  const fetchNext = useCallback(async () => {
    if (isLoading || !hasMore || loadingRef.current) {
      return;
    }
    const currentPage = pageRef.current;
    loadingRef.current = true;
    if (currentPage === 1) {
      setIsLoading(true);
    } else {
      setIsMoreLoading(true);
    }
    try {
      const response = await fetch(currentPage, limit);

      if (response === undefined || response.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => [...prevData, ...response]);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      if (currentPage === 1) {
        setIsLoading(false);
      } else {
        setIsMoreLoading(false);
      }
      loadingRef.current = false;
    }
  }, [fetch, limit, isLoading, hasMore, loadingRef]);

  const refresh = useCallback(async () => {
    if (isRefreshing) {
      return;
    }
    if (cacheKeys) {
      APIHelper.clearCache(cacheKeys);
    }

    setIsRefreshing(true);
    pageRef.current = 1;
    setHasMore(true);

    try {
      const response = await fetch(1, limit);
      if (response === undefined || response.length === 0) {
        setHasMore(false);
      } else {
        setData(response);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetch, limit, isRefreshing, cacheKeys]);

  useEffect(() => {
    if (enable && !isInit) {
      fetchNext();
      setIsInit(true);
    }
  }, [enable, isInit]);

  return {
    data,
    fetchNext,
    refresh,
    isLoading,
    isRefreshing,
    isMoreLoading,
    hasMore,
  };
}

export default usePagination;
