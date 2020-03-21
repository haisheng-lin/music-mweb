import React, { useState, useEffect, useRef } from 'react';

import Container from 'shared/container';

import FullScreenPlayer from './FullScreenPlayer';
import MiniPlayer from './MiniPlayer';

import styles from './index.module.scss';

const Player: React.FC = () => {
  const {
    isPlaying,
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

  const onPlayingToggle = () => {
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
        currentTime={currentPlayingTime}
        isPlaying={isPlaying}
        playingSong={playingSong}
        onBack={onFullScreenPlayerBack}
        onPlayingToggle={onPlayingToggle}
        onCurrentTimeChange={onCurrentTimeChange}
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
      />
    </div>
  );
};

export default Player;
