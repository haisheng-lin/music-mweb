import SongRepo from './repo';
import {
  RollApiPaginationQuery,
  RollApiPaginationResult
} from 'shared/typings';
import {
  FulfilledRecommendSong,
  FulfilledRank,
  FulfilledSingerSong,
  FulfilledSinger,
  FulfilledSingerDetail,
  FulfilledListSong,
  FulfilledSongDetail
} from './typings';

export default {
  getRecommendList: async () => {
    const responseList = await SongRepo.getRecommendList();
    return responseList.map(song => {
      const fulfilledSong: FulfilledRecommendSong = {
        songId: song.song_id,
        songName: song.title,
        singerId: song.ting_uid,
        singerPic: song.pic_singer,
        singerName: song.author,
        albumTitle: song.album_title,
        language: song.language,
        proxyCompany: song.si_proxycompany,
        info: song.info,
        hugeSongPic: song.pic_huge,
        bigSongPic: song.pic_big,
        premiumSongPic: song.pic_premium,
        smallSongPic: song.pic_small,
        publishTime: song.publishtime
      };

      return fulfilledSong;
    });
  },
  getRankList: async () => {
    const responseList = await SongRepo.getRankList();
    return responseList.map(song => {
      const fulfilledSong: FulfilledRank = {
        name: song.name,
        type: song.type,
        comment: song.comment,
        firstPic: song.pic_s192,
        secondPic: song.pic_s444,
        thirdPic: song.pic_s260,
        forthPic: song.pic_s210
      };

      return fulfilledSong;
    });
  },
  getRankSongList: async (query: RollApiPaginationQuery<{ type: number }>) => {
    const response = await SongRepo.getRankSongList(query);
    const fulfilledList = response.list.map(song => {
      const fulfilledSong: FulfilledSingerSong = {
        songId: song.song_id,
        songName: song.title,
        singerId: song.ting_uid,
        singerName: song.author,
        proxyCompany: song.si_proxycompany,
        duration: song.file_duration,
        lrcLink: song.lrclink,
        country: song.country,
        songPic: song.pic_big,
        language: song.language,
        publishTime: song.publishtime
      };

      return fulfilledSong;
    });
    const ret: RollApiPaginationResult<FulfilledSingerSong[]> = {
      ...response,
      list: fulfilledList
    };

    return ret;
  },
  searchSingerList: async (keyWord: string) => {
    const responseList = await SongRepo.searchSingerList(keyWord);
    return responseList as FulfilledSinger[];
  },
  getSingerDetail: async (singerId: string) => {
    const response = await SongRepo.getSingerDetail(singerId);
    const ret: FulfilledSingerDetail = {
      artistId: response.artist_id,
      singerId: response.singerId,
      singerName: response.name,
      stature: response.stature,
      avatar: response.avatar,
      constellation: response.constellation,
      intro: response.intro,
      company: response.company,
      country: response.country,
      birth: response.birth
    };

    return ret;
  },
  getSingerSongList: async (
    query: RollApiPaginationQuery<{ singerId: string }>
  ) => {
    const response = await SongRepo.getSingerSongList(query);
    const fulfilledList = response.list.map(song => {
      const fulfilledSong: FulfilledSingerSong = {
        songId: song.song_id,
        songName: song.title,
        singerId: song.ting_uid,
        singerName: song.author,
        proxyCompany: song.si_proxycompany,
        duration: song.file_duration,
        lrcLink: song.lrclink,
        country: song.country,
        songPic: song.pic_big,
        language: song.language,
        publishTime: song.publishtime
      };

      return fulfilledSong;
    });
    const ret: RollApiPaginationResult<FulfilledSingerSong[]> = {
      ...response,
      list: fulfilledList
    };

    return ret;
  },
  searchSongList: async (
    query: RollApiPaginationQuery<{ keyWord: string }>
  ) => {
    const response = await SongRepo.searchSongList(query);
    return response as RollApiPaginationResult<FulfilledListSong[]>;
  },
  getSongDetail: async (songId: string) => {
    const response = await SongRepo.getSongDetail(songId);
    const ret: FulfilledSongDetail = {
      songId: response.id,
      songName: response.songName,
      albumName: response.albumName,
      singerName: response.artistName,
      songPic: response.songPic,
      lrcLink: response.lrcLink,
      time: response.time,
      songLink: response.songLink,
      format: response.format,
      rate: response.rate,
      size: response.size
    };

    return ret;
  },
  getLyric: SongRepo.getLyric
};
