import request from 'shared/request';

import {
  RollApiPaginationQuery,
  RollApiPaginationResult
} from 'shared/typings';
import {
  ResponseRecommendSong,
  ResponseRank,
  ResponseListSong,
  ResponseSingerDetail,
  ResponseSingerSong,
  ResponseSongDetail,
  ResponseSinger
} from './typings';

export default {
  /**
   * 获取每日音乐推荐列表
   */
  getRecommendList: () => {
    return request.get<ResponseRecommendSong[]>('/music/recommend/list');
  },
  /**
   * 获取榜单列表
   */
  getRankList: () => {
    return request.get<ResponseRank[]>('/music/order/list');
  },
  /**
   * 获取指定榜单类型的歌曲列表
   */
  getRankSongList: (query: RollApiPaginationQuery<{ type: number }>) => {
    return request.get<RollApiPaginationResult<ResponseSingerSong[]>>(
      '/music/order/song/list',
      query
    );
  },
  /**
   * 搜索歌手列表
   */
  searchSingerList: (keyWord: string) => {
    return request.get<ResponseSinger[]>('/music/singer/search', { keyWord });
  },
  /**
   * 获取歌手详情
   */
  getSingerDetail: (singerId: string) => {
    return request.get<ResponseSingerDetail>('/music/singer/detail', {
      singerId
    });
  },
  /**
   * 获取歌手的歌曲列表
   */
  getSingerSongList: (query: RollApiPaginationQuery<{ singerId: string }>) => {
    return request.get<RollApiPaginationResult<ResponseSingerSong[]>>(
      '/music/singer/song/list',
      query
    );
  },
  /**
   * 搜索歌曲列表
   */
  searchSongList: (query: RollApiPaginationQuery<{ keyWord: string }>) => {
    return request.get<RollApiPaginationResult<ResponseListSong[]>>(
      '/music/song/search',
      query
    );
  },
  /**
   * 获取歌曲详情
   */
  getSongDetail: (songId: string) => {
    return request.get<ResponseSongDetail>('/music/song/detail', { songId });
  }
};
