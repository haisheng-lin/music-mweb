import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import ProgressCircle from './ProgressCircle';

import { PlayingSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface MiniPlayerProps {
  className?: string;
  visible?: boolean; // 是否可见
  percent?: number; // 播放进度
  isPlaying?: boolean; // 是否播放中
  playingSong?: PlayingSong; // 当前播放的歌曲
  onPlayerClick?: () => void; // 点击整个播放器的回调
  onPlayingToggle?: () => void; // 切换播放
  onPlayListShow?: () => void; // 点击列表图标的回调
}

const MiniPlayer: React.FC<MiniPlayerProps> = props => {
  const {
    className = '',
    visible,
    percent,
    isPlaying,
    playingSong,
    onPlayerClick,
    onPlayingToggle,
    onPlayListShow,
  } = props;

  const clickPlayIcon = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 阻止触发 onPlayerClick
    onPlayingToggle && onPlayingToggle();
  };

  const clickListIcon = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 阻止触发 onPlayerClick
    onPlayListShow && onPlayListShow();
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.visible]: visible,
        [className]: true,
      })}
      onClick={onPlayerClick}
    >
      <div className={styles.cd}>
        <div className={styles.cdImageWrapper}>
          <img
            className={classNames({
              [styles.cdImage]: true,
              [styles.playing]: isPlaying,
            })}
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
      <div className={styles.control}>
        <ProgressCircle percent={percent} radius={32}>
          <i
            className={classNames({
              [styles.playIcon]: true,
              'icon-pause-mini': isPlaying,
              'icon-play-mini': !isPlaying,
            })}
            onClick={clickPlayIcon}
          />
        </ProgressCircle>
      </div>
      <div className={styles.control}>
        <i
          className={classNames({
            [styles.listIcon]: true,
            'icon-playlist': true,
          })}
          onClick={clickListIcon}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
