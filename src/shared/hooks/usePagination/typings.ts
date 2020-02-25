import {
  RollApiPaginationQuery,
  RollApiPaginationResult
} from 'shared/typings';

interface CommonOption<T, U> {
  pageSize?: number;
  query?: T;
  initialPageNo?: number;
  defaultValue?: U[];
  onError?: (e: Error) => void;
  disabled?: boolean;
}

export interface RollApiOption<T, U> extends CommonOption<T, U> {
  type: 'ROLL';
  fetcher: (
    query: RollApiPaginationQuery<T>
  ) => Promise<RollApiPaginationResult<U[]>>;
}

export type Option<T, U> = RollApiOption<T, U>;

export interface StrategyParams<T> {
  fetcher: (params: any) => Promise<any>;
  pageNo: number;
  pageSize: number;
  queryData?: T;
}

export interface FetcherStategy {
  fetch: <T, U>(params: StrategyParams<T>) => Promise<U[]>;
}
