import React, { useEffect, useRef } from 'react';

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

  const onFullScreenPlayerBack = () => {
    setIsPlayerFullScreen(false);
  };

  const onMiniPlayerClick = () => {
    setIsPlayerFullScreen(true);
  };

  const onPlayingToggle = () => {
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    // if (audioRef.current) {
    //   audioRef.current.play();
    // }
  }, [playingSong]);

  return (
    <div className={styles.container}>
      {isPlayerFullScreen ? (
        <FullScreenPlayer
          songName={playingSong?.songName}
          singerName={playingSong?.singerName}
          image={playingSong?.image}
          isPlaying={isPlaying}
          onBack={onFullScreenPlayerBack}
          onPlayingToggle={onPlayingToggle}
        />
      ) : (
        <MiniPlayer
          songName={playingSong?.songName}
          singerName={playingSong?.singerName}
          image={playingSong?.image}
          onPlayerClick={onMiniPlayerClick}
        />
      )}
      <audio ref={audioRef} src={playingSong?.playUrl} />
    </div>
  );
};

export default Player;
