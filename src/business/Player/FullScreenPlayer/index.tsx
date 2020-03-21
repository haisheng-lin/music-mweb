import React from 'react';
import classNames from 'classnames';

import ProgressBar from './ProgressBar';

import { PlayingSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface FullScreenPlayerProps {
  className?: string;
  playingSong?: PlayingSong;
  currentTime?: number;
  isPlaying?: boolean;
  onBack?: () => void;
  onPlayingToggle?: () => void;
  onCurrentTimeChange?: (time: number) => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = props => {
  const {
    className = '',
    currentTime,
    playingSong,
    isPlaying,
    onBack,
    onPlayingToggle,
    onCurrentTimeChange
  } = props;

  const percent =
    currentTime && playingSong ? currentTime / playingSong.duration : 0;

  const pad = (val: string | number, n = 2) => {
    let length = val.toString().length;
    while (length < n) {
      val = '0' + val;
      length++;
    }

    return val;
  };

  const timeFormat = (time: number = 0) => {
    time = Math.floor(time);
    const minute = Math.floor(time / 60);
    const second = pad(time % 60);

    return `${minute}:${second}`;
  };

  const onPercentChange = (percent: number) => {
    const time = (playingSong?.duration || 0) * percent;
    onCurrentTimeChange && onCurrentTimeChange(time);
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <div className={styles.background}>
        <img
          width="100%"
          height="100%"
          src={playingSong?.image}
          alt={playingSong?.songName}
        />
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
        <h1 className={styles.title}>{playingSong?.songName}</h1>
        <h2 className={styles.subtitle}>{playingSong?.singerName}</h2>
      </div>
      <div className={styles.middle}>
        <div className={styles.middleLeft}>
          <div className={styles.cdWrapper}>
            <img
              className={styles.cdImage}
              src={playingSong?.image}
              alt={playingSong?.songName}
            />
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
            {timeFormat(currentTime)}
          </span>
          <ProgressBar
            className={styles.progressBar}
            percent={percent}
            onPercentChange={onPercentChange}
          />
          <span
            className={classNames({
              [styles.time]: true,
              [styles.right]: true
            })}
          >
            {timeFormat(playingSong?.duration)}
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
