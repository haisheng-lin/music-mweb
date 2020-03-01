import { useState, useEffect, useRef } from 'react';

import useAsyncTask from '../useAsyncTask';
import getFetcherStrategy from './fetcher-strategies';

import { Option } from './typings';

const usePagination = <T, U>(option: Option<T, U>) => {
  const {
    type,
    fetcher,
    pageSize = 10,
    query,
    initialPageNo = 1,
    defaultValue = [],
    onError,
    disabled = false
  } = option || {};
  const [isMounted, setIsMounted] = useState(false);
  const [params, setParams] = useState({
    query,
    pageNo: initialPageNo,
    pageSize
  });
  const [data, setData] = useState(defaultValue);
  const dataRef = useRef(data);

  const hasMore = data.length >= pageSize * params.pageNo;

  const task = async (option: {
    pageNo: number;
    pageSize: number;
    queryData?: T;
    isRefetch?: boolean;
  }) => {
    const { pageNo, pageSize, queryData, isRefetch } = option;
    try {
      // 根据 type 获取对应 fetcher 策略
      const strategy = getFetcherStrategy(type);
      const result = await strategy.fetch<T, U>({
        fetcher,
        pageNo,
        pageSize,
        queryData
      });
      const fulfilledResult = result || [];
      const lastSaveData = dataRef.current;
      // 具体 setData 策略
      if (!isRefetch) {
        const shouldReset = params.pageNo === initialPageNo;
        setData(
          shouldReset ? fulfilledResult : lastSaveData.concat(fulfilledResult)
        );
      } else {
        const previousPageData = lastSaveData.slice(
          0,
          (pageNo - 1) * params.pageSize
        );
        const nextPageData = lastSaveData.slice(pageNo * params.pageSize);
        setData([...previousPageData, ...fulfilledResult, ...nextPageData]);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      } else {
        throw e;
      }
    }
  };

  const loadMore = () => {
    if (!disabled && hasMore) {
      setParams(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
    }
  };

  const [finalTask, isLoaded, isPending] = useAsyncTask(task);

  const refetchTask = async (pageNo: number) => {
    if (disabled || initialPageNo > pageNo || pageNo > params.pageNo) {
      return;
    }
    finalTask({
      pageNo,
      pageSize: params.pageSize,
      queryData: query,
      isRefetch: true
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setParams(prev => ({ ...prev, query, pageNo: initialPageNo }));
    }
  }, [query]);

  useEffect(() => {
    if (!disabled) {
      finalTask({
        pageNo: params.pageNo,
        pageSize: params.pageSize,
        queryData: query
      });
    }
  }, [params, disabled]);

  return {
    data,
    refetch: refetchTask,
    hasMore,
    loadMore,
    isLoaded,
    isPending
  };
};

export default usePagination;
