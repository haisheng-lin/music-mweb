import React from 'react';
import classNames from 'classnames';

import { PlayingSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface MiniPlayerProps {
  className?: string;
  playingSong?: PlayingSong;
  onPlayerClick?: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = props => {
  const { className = '', playingSong, onPlayerClick } = props;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
      onClick={onPlayerClick}
    >
      <div className={styles.cd}>
        <div className={styles.cdImageWrapper}>
          <img
            className={styles.cdImage}
            width="40"
            height="40"
            src={playingSong?.image}
            alt={playingSong?.songName}
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
