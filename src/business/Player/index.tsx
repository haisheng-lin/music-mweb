import React, { useState, useEffect, useMemo, useRef } from 'react';

import Container from 'shared/container';

import FullScreenPlayer from './FullScreenPlayer';
import MiniPlayer from './MiniPlayer';
import PlayListModal from './PlayListModal';
import Confirm from 'shared/components/Confirm';

import LyricParser from 'shared/lyric-parser';
import { PlayMode } from 'shared/typings';
import message from 'shared/lib/message';

import styles from './index.module.scss';

const Player: React.FC = () => {
  const {
    isPlaying,
    playMode,
    setPlayMode,
    playList,
    songIndex,
    setSongIndex,
    setIsPlaying,
    playingSong,
    isPlayerFullScreen,
    setIsPlayerFullScreen,
    clearPlayList,
    favoriteList,
    saveFavorite,
    deleteFavorite,
    addAndPlaySong,
    deleteSong,
  } = Container.useContainer();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isPlayListVisible, setIsPlayListVisible] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [lyricParser, setLyricParser] = useState<LyricParser>();
  const [playingLyric, setPlayingLyric] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentPlayingTime, setCurrentPlayingTime] = useState(0);

  const currentPercent = playingSong
    ? currentPlayingTime / playingSong.duration
    : 0;

  const faviroteSongIdSet = useMemo(
    () => new Set(favoriteList.map(item => item.songId)),
    [favoriteList]
  );

  const onFullScreenPlayerBack = () => {
    setIsPlayerFullScreen(false);
  };

  const onMiniPlayerClick = () => {
    setIsPlayerFullScreen(true);
  };

  const togglePlaying = () => {
    setIsPlaying(prev => !prev);
  };

  const updatePlayingTime = (e: any) => {
    // 这里没办法，只能用 any
    setCurrentPlayingTime(e.target.currentTime);
  };

  const onPercentChange = (percent: number) => {
    const time = (playingSong?.duration || 0) * percent;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    if (!isPlaying) {
      togglePlaying();
    }
    if (lyricParser) {
      lyricParser.seek(time * 1000);
    }
  };

  const onAudioReady = () => {
    setIsAudioReady(true);
  };

  const handleAudioError = () => {
    message.info('播放出错');
  };

  const loop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (lyricParser) {
      lyricParser.seek();
    }
  };

  const next = () => {
    const listLength = playList.length;
    if (listLength === 1) {
      loop();
    } else {
      const nextIndex = (songIndex + 1) % listLength;
      setSongIndex(nextIndex);
    }
    if (!isPlaying) {
      togglePlaying();
    }
  };

  const playingCompleted = () => {
    if (playMode === PlayMode.Loop) {
      loop();
    } else {
      next();
    }
  };

  const handleLyric = (data: { lineNum: number; lyricText: string }) => {
    setPlayingLyric(data.lyricText);
  };

  const playPrevSong = () => {
    if (!isAudioReady) {
      return;
    }
    if (playList.length === 1) {
      loop();
    } else {
      setSongIndex(prev => {
        let nextIndex = (prev - 1) % playList.length;
        if (nextIndex === -1) {
          nextIndex = playList.length - 1;
        }
        return nextIndex;
      });
    }
    if (!isPlaying) {
      togglePlaying();
    }
  };

  const playNextSong = () => {
    if (!isAudioReady) {
      return;
    }
    if (playList.length === 1) {
      loop();
    } else {
      setSongIndex(prev => (prev + 1) % playList.length);
    }
    if (!isPlaying) {
      togglePlaying();
    }
  };

  const confirmClear = () => {
    clearPlayList();
    setIsConfirmVisible(false);
    setIsPlayListVisible(false);
  };

  const playListWithFavorite = useMemo(
    () =>
      playList.map(song => ({
        ...song,
        isFavorite: faviroteSongIdSet.has(song.songId),
      })),
    [playList, faviroteSongIdSet]
  );

  const fullScreenPlayingSong = useMemo(
    () =>
      playingSong && {
        ...playingSong,
        isFavorite: faviroteSongIdSet.has(playingSong.songId),
      },
    [playingSong, faviroteSongIdSet]
  );

  useEffect(() => {
    setCurrentPlayingTime(0);
    setIsAudioReady(false);
    if (playingSong) {
      setLyricParser(prev => {
        prev && prev.stop();
        return new LyricParser(playingSong.lyric, handleLyric);
      });
    }
  }, [playingSong]);

  useEffect(() => {
    if (lyricParser) {
      lyricParser.togglePlay();
    }
  }, [lyricParser, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && isAudioReady) {
        audioRef.current.play();
      } else if (isAudioReady) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isAudioReady]);

  return (
    <div className={styles.container}>
      <FullScreenPlayer
        visible={isPlayerFullScreen}
        lyric={playingLyric}
        playMode={playMode}
        currentTime={currentPlayingTime}
        isPlaying={isPlaying}
        playingSong={fullScreenPlayingSong}
        onBack={onFullScreenPlayerBack}
        onPlayingToggle={togglePlaying}
        onPercentChange={onPercentChange}
        onPlayModeChange={setPlayMode}
        onPrevClick={playPrevSong}
        onNextClick={playNextSong}
        onFavoriteSave={saveFavorite}
        onFavoriteDelete={deleteFavorite}
      />
      <MiniPlayer
        visible={!isPlayerFullScreen && !!playingSong}
        isPlaying={isPlaying}
        percent={currentPercent}
        playingSong={playingSong}
        onPlayingToggle={togglePlaying}
        onPlayerClick={onMiniPlayerClick}
        onPlayListShow={() => setIsPlayListVisible(true)}
      />
      <PlayListModal
        visible={isPlayListVisible}
        playMode={playMode}
        playList={playListWithFavorite}
        playingSongId={playingSong?.songId}
        onClose={() => setIsPlayListVisible(false)}
        onSelect={addAndPlaySong}
        onRemove={deleteSong}
        onClear={() => setIsConfirmVisible(true)}
        onFavoriteSave={saveFavorite}
        onFavoriteDelete={deleteFavorite}
      />
      <Confirm
        visible={isConfirmVisible}
        content="是否清空播放列表"
        confirmText="清空"
        onCancel={() => setIsConfirmVisible(false)}
        onConfirm={confirmClear}
      />
      <audio
        ref={audioRef}
        src={playingSong?.playUrl}
        onCanPlay={onAudioReady}
        onTimeUpdate={updatePlayingTime}
        onEnded={playingCompleted}
        onError={handleAudioError}
      />
    </div>
  );
};

export default Player;
