import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import { PlayMode } from 'shared/typings';
import { PlayerSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface Song extends PlayerSong {
  isFavorite: boolean;
}

interface PlayListModalProps {
  className?: string;
  visible?: boolean; // 是否可见
  playMode?: PlayMode; // 播放模式
  playList?: Song[]; // 播放列表
  playingSongId?: string; // 当前播放歌曲 id
  onClose?: () => void; // 关闭回调
  onSelect?: (song: Song) => void; // 选择歌曲回调
  onFavoriteSave?: (song: Song) => void;
  onFavoriteDelete?: (song: Song) => void;
  onRemove?: (song: Song) => void; // 移除歌曲回调
  onClear?: () => void; // 清空播放列表回调
}

const playModeDescMap = {
  [PlayMode.Sequence]: '顺序播放',
  [PlayMode.Random]: '随机播放',
  [PlayMode.Loop]: '单曲循环'
};

const PlayListModal: React.FC<PlayListModalProps> = props => {
  const {
    className = '',
    visible,
    playMode,
    playList = [],
    playingSongId,
    onClose,
    onSelect,
    onFavoriteSave,
    onFavoriteDelete,
    onRemove,
    onClear
  } = props;

  const stopPropagation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const selectSong = (song: Song) => () => {
    onSelect && onSelect(song);
  };

  const toggleFavorite = (song: Song) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (song.isFavorite) {
      onFavoriteDelete && onFavoriteDelete(song);
    } else {
      onFavoriteSave && onFavoriteSave(song);
    }
  };

  const removeSong = (song: Song) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onRemove && onRemove(song);
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true,
        [styles.visible]: visible
      })}
      onClick={onClose}
    >
      <div className={styles.body} onClick={stopPropagation}>
        <div className={styles.header}>
          <i
            className={classNames({
              [styles.modeIcon]: true,
              'icon-sequence': playMode === PlayMode.Sequence,
              'icon-loop': playMode === PlayMode.Loop,
              'icon-random': playMode === PlayMode.Random
            })}
          />
          <span className={styles.modeText}>
            {playMode ? playModeDescMap[playMode] : ''}
          </span>
          <span className={styles.clear} onClick={onClear}>
            <i
              className={classNames({
                'icon-clear': true,
                [styles.clearIcon]: true
              })}
            />
          </span>
        </div>
        <ul className={styles.list}>
          {playList.map(song => (
            <li
              key={song.songId}
              className={styles.item}
              onClick={selectSong(song)}
            >
              <i
                className={classNames({
                  [styles.current]: true,
                  'icon-play': song.songId === playingSongId
                })}
              />
              <span className={styles.songName}>{song.songName}</span>
              <span className={styles.like} onClick={toggleFavorite(song)}>
                <i
                  className={classNames({
                    'icon-favorite': song.isFavorite,
                    'icon-not-favorite': !song.isFavorite
                  })}
                />
              </span>
              <span className={styles.delete} onClick={removeSong(song)}>
                <i className="icon-delete" />
              </span>
            </li>
          ))}
        </ul>
        <span className={styles.close} onClick={onClose}>
          关闭
        </span>
      </div>
    </div>
  );
};

export default PlayListModal;
