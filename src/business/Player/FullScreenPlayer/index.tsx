import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import ProgressBar from './ProgressBar';

import { syncWrapperTransform } from '../common';
import { PlayingSong } from 'shared/domain/song/typings';
import { PlayMode } from 'shared/typings';

import styles from './index.module.scss';

interface FullScreenPlayerProps {
  className?: string;
  visible?: boolean;
  playMode?: PlayMode;
  playingSong?: PlayingSong;
  currentTime?: number;
  isPlaying?: boolean;
  onBack?: () => void;
  onPlayingToggle?: () => void;
  onCurrentTimeChange?: (time: number) => void;
  onPlayModeChange?: (mode: PlayMode) => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = props => {
  const {
    className = '',
    visible,
    playMode,
    currentTime,
    playingSong,
    isPlaying,
    onBack,
    onPlayingToggle,
    onCurrentTimeChange,
    onPlayModeChange
  } = props;

  const cdWrapperRef = useRef<HTMLDivElement>(null);
  const cdImageRef = useRef<HTMLImageElement>(null);

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

  const onModeChange = () => {
    const modes = Object.values(PlayMode);
    const index = modes.findIndex(mode => mode === playMode);
    const nextIndex = (index + 1) % modes.length;
    onPlayModeChange && onPlayModeChange(modes[nextIndex]);
  };

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
    >
      <div className={styles.background}>
        <img
          width="100%"
          height="100%"
          src={playingSong?.image}
          alt={playingSong?.songName}
        />
      </div>
      <div
        className={classNames({
          [styles.top]: true,
          [styles.visible]: visible
        })}
      >
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
          <div className={styles.cdWrapper} ref={cdWrapperRef}>
            <img
              className={classNames({
                [styles.cdImage]: true,
                [styles.playing]: isPlaying
              })}
              src={playingSong?.image}
              alt={playingSong?.songName}
              ref={cdImageRef}
            />
          </div>
        </div>
      </div>
      <div
        className={classNames({
          [styles.bottom]: true,
          [styles.visible]: visible
        })}
      >
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
                'icon-sequence': playMode === PlayMode.Sequence,
                'icon-loop': playMode === PlayMode.Loop,
                'icon-random': playMode === PlayMode.Random
              })}
              onClick={onModeChange}
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
