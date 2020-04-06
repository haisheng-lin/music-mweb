import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import useLocalStorage from 'shared/hooks/storage/useLocalStorage';

import SongUsecase from 'shared/domain/song';
import { shuffle, insertToArray, deleteFromArray } from 'shared/utils';
import {
  STORATE_PLAY_LIST_KEY,
  STORAGE_HISTORY_TERMS_KEY,
  STORAGE_FAVORITE_LIST_KEY,
  MAX_FAVORITE_LIST_LENGTH,
} from 'shared/constants';
import { PlayerSong, PlayingSong } from 'shared/domain/song/typings';
import { PlayMode } from 'shared/typings';

import message from 'shared/lib/message';

export default createContainer(() => {
  // 是否在播放音乐
  const [isPlaying, setIsPlaying] = useState(false);
  // 播放器是否全屏
  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);
  // 播放列表，当循环播放与随机播放时会跟 sequenceList 不同
  const [playList, setPlayList] = useLocalStorage<PlayerSong[]>(
    STORATE_PLAY_LIST_KEY,
    []
  );
  // 播放中的歌曲，需要额外获取详情的歌词与播放地址
  const [playingSong, setPlayingSong] = useState<PlayingSong>();
  // 顺序播放列表
  const [sequenceList, setSequenceList] = useState<PlayerSong[]>([]);
  // 播放模式
  const [playMode, setPlayMode] = useState<PlayMode>(PlayMode.Sequence);
  // 播放的音乐在列表的索引
  const [songIndex, setSongIndex] = useState(-1);
  // 搜索历史
  const [historyTerms, setHistoryTerms] = useLocalStorage<string[]>(
    STORAGE_HISTORY_TERMS_KEY,
    []
  );
  // 收藏歌曲
  const [favoriteList, setFavoriteList] = useLocalStorage<PlayerSong[]>(
    STORAGE_FAVORITE_LIST_KEY,
    []
  );

  /**
   * 如果列表无歌曲，则添加，自动播放歌曲
   */
  const addAndPlaySong = (song: PlayerSong) => {
    const targetIndex = playList.findIndex(
      (item) => item.songId === song.songId
    );
    if (targetIndex > -1) {
      setSongIndex(targetIndex);
    } else {
      setPlayList((prev) => (prev ? [...prev, song] : [song]));
      setSongIndex(playList.length);
    }
    setIsPlayerFullScreen(true);
  };

  /**
   * 从播放列表删除歌曲
   */
  const deleteSong = (song: PlayerSong) => {
    const newPlayList = playList.slice();
    const newSequenceList = sequenceList.slice();
    let nextSongIndex = songIndex;

    const pIndex = newPlayList.findIndex((item) => item.songId === song.songId);
    newPlayList.splice(pIndex, 1);
    const sIndex = newSequenceList.findIndex(
      (item) => item.songId === song.songId
    );
    newSequenceList.splice(sIndex, 1);
    if (songIndex > pIndex || nextSongIndex === newPlayList.length) {
      // 如果删掉的歌曲在当前歌曲之前，或者当前歌曲是最后一首，则需减 1
      nextSongIndex--;
    }
    setPlayList(newPlayList);
    setSequenceList(newSequenceList);
    setSongIndex(nextSongIndex);
  };

  /**
   * 选择播放
   */
  const selectPlay = (list: PlayerSong[], index: number) => {
    setSequenceList(list);
    // setPlayMode('SEQUENCE');
    setPlayList(list);
    setSongIndex(index);
    setIsPlayerFullScreen(true);
  };

  /**
   * 随机播放
   */
  const randomPlay = (list: PlayerSong[]) => {
    setSequenceList(list);
    setPlayMode(PlayMode.Random);
    const randomPlayList = shuffle(list);
    setPlayList(randomPlayList);
    setSongIndex(0);
    setIsPlayerFullScreen(true);
  };

  /**
   * 清空播放列表
   */
  const clearPlayList = () => {
    setPlayList([]);
    setSequenceList([]);
    setSongIndex(-1);
    setIsPlaying(false);
  };

  /**
   * 收藏歌曲
   */
  const saveFavorite = (song: PlayerSong) => {
    setFavoriteList((prev) =>
      prev
        ? insertToArray(
            prev,
            song,
            (item) => item.songId === song.songId,
            MAX_FAVORITE_LIST_LENGTH
          )
        : [song]
    );
  };

  /**
   * 取消收藏歌曲
   */
  const deleteFavorite = (song: PlayerSong) => {
    setFavoriteList((prev) =>
      prev ? deleteFromArray(prev, (item) => item.songId === song.songId) : []
    );
  };

  const onPlayListAndSongIndexChanged = async (
    list: PlayerSong[],
    index: number,
    playingSongId?: string
  ) => {
    try {
      if (0 <= index && index < list.length) {
        const playSong = list[index];
        const songId = playSong.songId;
        if (songId !== playingSongId) {
          const result = await SongUsecase.getSongDetail(songId);
          const lyric = await SongUsecase.getLyric(result.lrcLink);
          setPlayingSong({
            songId,
            songName: result.songName,
            singerName: result.singerName,
            image: result.songPic,
            lyric,
            playUrl: result.songLink,
            duration: result.time,
          });
          setIsPlaying(true);
        }
      } else {
        setIsPlaying(false);
        setPlayingSong(undefined);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    onPlayListAndSongIndexChanged(playList, songIndex, playingSong?.songId);
  }, [playList, songIndex, playingSong]);

  return {
    isPlaying,
    setIsPlaying,
    isPlayerFullScreen,
    setIsPlayerFullScreen,
    playList,
    setPlayList,
    sequenceList,
    setSequenceList,
    playMode,
    setPlayMode,
    songIndex,
    setSongIndex,
    historyTerms,
    setHistoryTerms,
    selectPlay,
    randomPlay,
    playingSong,
    addAndPlaySong,
    deleteSong,
    clearPlayList,
    favoriteList,
    saveFavorite,
    deleteFavorite,
  };
});
