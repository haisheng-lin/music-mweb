import React from 'react';
import classNames from 'classnames';

import ProgressBar from './ProgressBar';

import styles from './index.module.scss';

interface FullScreenPlayerProps {
  className?: string;
  songName?: string;
  singerName?: string;
  image?: string;
  isPlaying?: boolean;
  onBack?: () => void;
  onPlayingToggle?: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = props => {
  const {
    className = '',
    songName,
    singerName,
    image,
    isPlaying,
    onBack,
    onPlayingToggle
  } = props;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <div className={styles.background}>
        <img width="100%" height="100%" src={image} alt={songName} />
      </div>
      <div className={styles.top}>
        <div className={styles.back} onClick={onBack}>
          <i
            className={classNames({
              'icon-back': true,
              [styles.backIcon]: true
            })}
          />
        </div>
        <h1 className={styles.title}>{songName}</h1>
        <h2 className={styles.subtitle}>{singerName}</h2>
      </div>
      <div className={styles.middle}>
        <div className={styles.middleLeft}>
          <div className={styles.cdWrapper}>
            <img className={styles.cdImage} src={image} alt={songName} />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.progressWrapper}>
          <span
            className={classNames({
              [styles.time]: true,
              [styles.left]: true
            })}
          >
            0:00
          </span>
          <ProgressBar className={styles.progressBar} />
          <span
            className={classNames({
              [styles.time]: true,
              [styles.right]: true
            })}
          >
            0:00
          </span>
        </div>
        <div className={styles.operations}>
          <div
            className={classNames({
              'icon-left': true,
              [styles.icon]: true,
              [styles.leftIcon]: true
            })}
          >
            <i
              className={classNames({
                'icon-sequence': true
              })}
            />
          </div>
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.leftIcon]: true
            })}
          >
            <i className="icon-prev" />
          </div>
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.centerIcon]: true
            })}
          >
            <i
              className={classNames({
                'icon-pause': isPlaying,
                'icon-play': !isPlaying
              })}
              onClick={onPlayingToggle}
            />
          </div>
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.rightIcon]: true
            })}
          >
            <i className="icon-next" />
          </div>
          <div
            className={classNames({
              [styles.icon]: true,
              [styles.rightIcon]: true
            })}
          >
            <i
              className={classNames({
                'icon-favorite': false,
                'icon-not-favorite': true
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
