/**
 * 分页查询基本参数
 * https://github.com/MZCretin/RollToolsApi
 */
interface RollApiBasicPaginationQuery {
  page: number;
}

/**
 * 分页查询参数
 */
export type RollApiPaginationQuery<T> = T extends
  | void
  | undefined
  | null
  | never
  ? RollApiBasicPaginationQuery
  : T & RollApiBasicPaginationQuery;

/**
 * 分页查询结果
 */
export interface RollApiPaginationResult<T> {
  page: number; // 当前页数
  totalCount: number; // 总数量
  totalPage: number; // 总页数
  list: T; // 具体数据模型
  limit: number; // 每页数量
}
