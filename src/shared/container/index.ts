import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import useLocalStorage from 'shared/hooks/storage/useLocalStorage';

import SongUsecase from 'shared/domain/song';
import { shuffle } from 'shared/utils';
import { STORAGE_HISTORY_TERMS_KEY } from 'shared/constants';
import { PlayerSong, PlayingSong } from 'shared/domain/song/typings';
import { PlayMode } from 'shared/typings';

import message from 'shared/lib/message';

export default createContainer(() => {
  // 是否在播放音乐
  const [isPlaying, setIsPlaying] = useState(false);
  // 播放器是否全屏
  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);
  // 播放列表，当循环播放与随机播放时会跟 sequenceList 不同
  const [playList, setPlayList] = useState<PlayerSong[]>([]);
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

  /**
   * 将歌曲添加至播放列表，并自动播放
   */
  const addAndPlaySong = (song: PlayerSong) => {
    setPlayList(prev => [...prev, song]);
    setSongIndex(playList.length);
    setIsPlayerFullScreen(true);
    setIsPlaying(true);
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
    setIsPlaying(true);
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
    setIsPlaying(true);
  };

  const getSongDetail = async (songId: string) => {
    try {
      const result = await SongUsecase.getSongDetail(songId);
      const lyric = await SongUsecase.getLyric(result.lrcLink);
      setPlayingSong({
        songId: result.songId,
        songName: result.songName,
        singerName: result.singerName,
        image: result.songPic,
        lyric,
        playUrl: result.songLink,
        duration: result.time
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    if (0 <= songIndex && songIndex < playList.length) {
      const playSong = playList[songIndex];
      const songId = playSong.songId;
      getSongDetail(songId);
    }
  }, [playList, songIndex]);

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
    addAndPlaySong
  };
});
