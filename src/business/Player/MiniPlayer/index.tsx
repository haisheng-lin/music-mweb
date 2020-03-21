import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { syncWrapperTransform } from '../common';
import { PlayingSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface MiniPlayerProps {
  className?: string;
  visible?: boolean;
  isPlaying?: boolean;
  playingSong?: PlayingSong;
  onPlayerClick?: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = props => {
  const {
    className = '',
    visible,
    isPlaying,
    playingSong,
    onPlayerClick
  } = props;

  const cdWrapperRef = useRef<HTMLDivElement>(null);
  const cdImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isPlaying && cdWrapperRef.current && cdImageRef.current) {
      syncWrapperTransform(cdWrapperRef.current, cdImageRef.current);
    }
  }, [isPlaying, cdWrapperRef, cdImageRef]);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.visible]: visible,
        [className]: true
      })}
      onClick={onPlayerClick}
    >
      <div className={styles.cd}>
        <div className={styles.cdImageWrapper} ref={cdWrapperRef}>
          <img
            className={classNames({
              [styles.cdImage]: true,
              [styles.playing]: isPlaying
            })}
            width="40"
            height="40"
            src={playingSong?.image}
            alt={playingSong?.songName}
            ref={cdImageRef}
          />
        </div>
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{playingSong?.songName}</span>
        <span className={styles.desc}>{playingSong?.singerName}</span>
      </div>
    </div>
  );
};

export default MiniPlayer;
