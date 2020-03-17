import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface MiniPlayerProps {
  className?: string;
  songName?: string;
  singerName?: string;
  image?: string;
  onPlayerClick?: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = props => {
  const { className = '', songName, singerName, image, onPlayerClick } = props;

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
            src={image}
            alt={songName}
          />
        </div>
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{songName}</span>
        <span className={styles.desc}>{singerName}</span>
      </div>
    </div>
  );
};

export default MiniPlayer;
