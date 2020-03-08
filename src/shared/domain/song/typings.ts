/**
 * 接口返回的原始数据，推荐歌曲
 */
export interface ResponseRecommendSong {
  pic_huge: string; // 最大的图片地址
  ting_uid: string; // 歌手 id
  si_proxycompany: string; // 公司信息
  author: string; // 歌手姓名
  info: string; // 音乐描述
  album_title: string; // 专辑名称
  title: string; // 音乐名称
  language: string; // 音乐语言
  pic_big: string; // 歌曲大图
  pic_singer: string; // 歌手图片
  publishtime: string; // 发布时间
  pic_premium: string; // 歌曲图片-中
  pic_small: string; // 歌曲图片-小
  song_id: string; // 歌曲 id，查询歌曲详情需要用到
}

/**
 * 经处理的数据，推荐歌曲
 */
export interface FulfilledRecommendSong {
  songId: string; // 歌曲 id
  songName: string; // 歌曲名称
  singerId: string; // 歌手 id
  singerPic: string; // 歌手图片
  singerName: string; // 歌手姓名
  albumTitle: string; // 专辑名称
  language: string; // 音乐语言
  proxyCompany: string; // 公司信息
  info: string; // 音乐描述
  hugeSongPic: string; // 歌曲最大图
  bigSongPic: string; // 歌曲大图
  premiumSongPic: string; // 歌曲中图
  smallSongPic: string; // 歌曲小图
  publishTime: string; // 发布时间
}

/**
 * 接口返回的原始数据，榜单
 */
export interface ResponseRank {
  name: string; // 榜单名称
  type: number; // 榜单类型，查询榜单歌曲列表需要用到
  comment: string; // 榜单描述
  pic_s192: string; // 榜单图片 1
  pic_s444: string; // 榜单图片 2
  pic_s260: string; // 榜单图片 3
  pic_s210: string; // 榜单图片 4
}

/**
 * 经处理的数据，榜单歌曲
 */
export interface FulfilledRank {
  name: string; // 榜单名称
  type: number; // 榜单类型，查询榜单歌曲列表需要用到
  comment: string; // 榜单描述
  firstPic: string; // 榜单图片 1
  secondPic: string; // 榜单图片 2
  thirdPic: string; // 榜单图片 3
  forthPic: string; // 榜单图片 4
}

/**
 * 接口返回的原始数据，歌手列表对象
 */
export interface ResponseSinger {
  singerId: string; // 歌手 id
  singerName: string; // 歌手名字
  singerPic: string; // 歌手图片
}

/**
 * 接口返回的原始数据，歌手列表对象
 */
export interface FulfilledSinger {
  singerId: string; // 歌手 id
  singerName: string; // 歌手名字
  singerPic: string; // 歌手图片
}

/**
 * 接口返回的原始数据，歌手详情
 */
export interface ResponseSingerDetail {
  artist_id: string; // 艺术家 id ??
  singerId: string; // 歌手 id
  name: string; // 名字
  stature: string; // 身高
  avatar: string; // 头像
  constellation: string; // 星座
  intro: string; // 简介
  company: string; // 公司
  country: string; // 国家
  birth: string; // 生日
}

/**
 * 经处理的数据，歌手详情
 */
export interface FulfilledSingerDetail {
  artistId: string; // 艺术家 id
  singerId: string; // 歌手 id
  singerName: string; // 名字
  stature: string; // 身高
  avatar: string; // 头像
  constellation: string; // 星座
  intro: string; // 简介
  company: string; // 公司
  country: string; // 国家
  birth: string; // 生日
}

/**
 * 接口返回的原始数据，歌手的歌曲列表对象（也适用于榜单歌曲列表）
 */
export interface ResponseSingerSong {
  song_id: string; // 歌曲 id
  ting_uid: string; // 歌手 id
  title: string; // 歌曲名称
  author: string; // 歌手名字
  si_proxycompany: string; // 公司信息
  file_duration: string; // 歌曲时长，如: '232'
  lrclink: string; // 歌词地址
  country: string; // 国家
  pic_big: string; // 音乐大图地址
  language: string; // 语言
  publishtime: string; // 发布时间
}

/**
 * 经处理的数据，歌手的歌曲列表对象（也适用于榜单歌曲列表）
 */
export interface FulfilledSingerSong {
  songId: string;
  songName: string;
  singerId: string;
  singerName: string;
  proxyCompany: string;
  duration: string;
  lrcLink: string;
  country: string;
  songPic: string;
  language: string;
  publishTime: string;
}

/**
 * 接口返回的原始数据，搜索歌曲列表对象
 */
export interface ResponseListSong {
  id: string; // 歌曲 id
  songName: string; // 歌曲名称
  albumName: string; // 专辑名称
  artistName: string; // 歌手姓名
}

/**
 * 经处理的数据，搜索歌曲列表对象
 */
export interface FulfilledListSong {
  id: string; // 歌曲 id
  songName: string; // 歌曲名称
  albumName: string; // 专辑名称
  artistName: string; // 歌手姓名
}

/**
 * 接口返回的原始数据，歌曲详情
 */
export interface ResponseSongDetail {
  id: string; // 歌曲 id
  songName: string; // 歌曲名称
  albumName: string; // 专辑名称
  artistName: string; // 歌手姓名
  songPic: string; // 歌曲图片
  lrcLink: string; // 歌词地址
  time: number; // 歌曲时长，单位：秒
  songLink: string; // 歌曲下载地址
  format: string; // 格式，如：mp3
  rate: number;
  size: number; // 歌曲大小
}

/**
 * 经处理的数据，歌曲详情
 */
export interface FulfilledSongDetail {
  songId: string; // 歌曲 id
  songName: string; // 歌曲名称
  albumName: string; // 专辑名称
  singerName: string; // 歌手姓名
  songPic: string; // 歌曲图片
  lrcLink: string; // 歌词地址
  time: number; // 歌曲时长，单位：秒
  songLink: string; // 歌曲下载地址
  format: string; // 格式，如：mp3
  rate: number;
  size: number; // 歌曲大小
}

/**
 * 存在播放器中的歌曲
 */
export interface PlayerSong {
  songId: string;
  songName: string;
  singerName: string;
  image: string;
}

/**
 * 正在播放的歌曲（需获取详情的歌词与播放地址）
 */
export interface PlayingSong extends PlayerSong {
  lrcLink: string;
  playUrl: string;
}
