import React, { useState, useEffect, useRef } from 'react';

import Container from 'shared/container';

import FullScreenPlayer from './FullScreenPlayer';
import MiniPlayer from './MiniPlayer';

import { PlayMode } from 'shared/typings';

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
    setIsPlayerFullScreen
  } = Container.useContainer();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentPlayingTime, setCurrentPlayingTime] = useState(0);

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

  const onCurrentTimeChange = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const loop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const next = () => {
    const listLength = playList.length;
    if (listLength === 1) {
      loop();
    } else {
      const nextIndex = (songIndex + 1) % listLength;
      setSongIndex(nextIndex);
      if (!isPlaying) {
        togglePlaying();
      }
    }
  };

  const playingCompleted = () => {
    if (playMode === PlayMode.Loop) {
      loop();
    } else {
      next();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playingSong, isPlaying]);

  return (
    <div className={styles.container}>
      <FullScreenPlayer
        visible={isPlayerFullScreen}
        playMode={playMode}
        currentTime={currentPlayingTime}
        isPlaying={isPlaying}
        playingSong={playingSong}
        onBack={onFullScreenPlayerBack}
        onPlayingToggle={togglePlaying}
        onCurrentTimeChange={onCurrentTimeChange}
        onPlayModeChange={setPlayMode}
      />
      <MiniPlayer
        visible={!isPlayerFullScreen && !!playingSong}
        isPlaying={isPlaying}
        playingSong={playingSong}
        onPlayerClick={onMiniPlayerClick}
      />
      <audio
        ref={audioRef}
        src={playingSong?.playUrl}
        onTimeUpdate={updatePlayingTime}
        onEnded={playingCompleted}
      />
    </div>
  );
};

export default Player;
