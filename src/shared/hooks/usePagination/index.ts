import { useState, useEffect, useRef } from 'react';

import useAsyncTask from '../useAsyncTask';
import getFetcherStrategy from './fetcher-strategies';

import { Option } from './typings';

/**
 * 依赖图：
 *
 *         disabled (可能由 query 影响)
 *       /                             \
 * query ------------------------------- task
 *       \                             /
 *                    page
 *
 * 解释：
 *
 * 1. query 变化，需要重置 page
 * 2. disabled 可能由 query 决定，也可能由其他因素决定
 * 3. 只有 page 与 disabled 稳定后，才能执行 task
 * 4. 为何一开始设置 page 为 undefined？因为监听 query 时会设置
 *    一开始就设置了，那加上 useEffect query 就设两次了，task 就会被执行两次
 *    执行 task 之前先判断 page 是否 undefined，就可以避免多余的一次执行
 * 5. 为何 disabled 要设为状态，而不用 option 的？
 *    有的场景是 query 影响 disabled 与 page 的，所以如果直接用 disabled
 *    那么 useEffect 监听 disabled 时，page 还没重设，就会出现问题
 *    为何不用 ref，因为无法保证：
 *    query -> setPage 的 useEffect 会比 disabled -> task 的 useEffect 先执行
 */
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
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [page, setPage] = useState<{ pageNo: number; pageSize: number }>();
  const [data, setData] = useState(defaultValue);
  const dataRef = useRef(defaultValue);
  dataRef.current = data;

  const hasMore = page ? data.length >= pageSize * page.pageNo : true;

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
      // 具体 setData 策略
      const curData = dataRef.current;
      if (!isRefetch) {
        const shouldReset = pageNo === initialPageNo;
        setData(
          shouldReset ? fulfilledResult : curData.concat(fulfilledResult)
        );
      } else {
        const previousPageData = curData.slice(0, (pageNo - 1) * pageSize);
        const nextPageData = curData.slice(pageNo * pageSize);
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
    if (!isDisabled && hasMore) {
      setPage(prev => ({
        pageSize,
        pageNo: prev ? prev.pageNo + 1 : initialPageNo
      }));
    }
  };

  const [finalTask, isLoaded, isPending] = useAsyncTask(task);

  const refetchTask = async (pageNo: number) => {
    if (isDisabled || !page || initialPageNo > pageNo || pageNo > page.pageNo) {
      return;
    }
    finalTask({
      pageNo,
      pageSize: page.pageSize,
      queryData: query,
      isRefetch: true
    });
  };

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setPage({ pageSize, pageNo: initialPageNo });
  }, [query, initialPageNo, pageSize]);

  useEffect(() => {
    if (!isDisabled && page) {
      finalTask({
        pageNo: page.pageNo,
        pageSize: page.pageSize,
        queryData: query
      });
    }
  }, [page, isDisabled]);

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
