import {
  RollApiPaginationQuery,
  RollApiPaginationResult
} from 'shared/typings';
import { StrategyParams, FetcherStategy } from '../typings';

class RollStrategy implements FetcherStategy {
  public async fetch<T, U>(params: StrategyParams<T>) {
    const { fetcher, pageNo, queryData } = params;
    const rollFetcher = fetcher as (
      query: RollApiPaginationQuery<T>
    ) => Promise<RollApiPaginationResult<U[]>>;
    const result = await rollFetcher({
      ...queryData,
      page: pageNo
    } as RollApiPaginationQuery<T>);

    return result.list;
  }
}

function createStrategy() {
  return new RollStrategy();
}

export default createStrategy();
