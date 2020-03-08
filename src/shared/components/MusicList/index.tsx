import React from 'react';
import classNames from 'classnames';

import SongList from 'shared/components/SongList';
import { FulfilledSingerSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface MusicListProps {
  className?: string;
  title?: string;
  cover?: string;
  songList?: FulfilledSingerSong[];
  onBack?: () => void;
  onSongSelect?: (song: FulfilledSingerSong, index: number) => void;
}

const MusicList: React.FC<MusicListProps> = props => {
  const {
    className = '',
    title,
    cover,
    songList,
    onSongSelect,
    onBack
  } = props;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <header className={styles.header}>
        <i
          className={classNames({
            'icon-back': true,
            [styles.backIcon]: true
          })}
          onClick={onBack}
        />
        <h1 className={styles.title}>{title}</h1>
      </header>
      <div
        className={styles.cover}
        style={{
          backgroundImage: `url(${cover})`
        }}
      >
        <div className={styles.mask}></div>
        <div className={styles.playerWrapper}>
          <div className={styles.play}>
            <i
              className={classNames({
                'icon-play': true,
                [styles.playIcon]: true
              })}
            />
            <span className={styles.text}>随机播放全部</span>
          </div>
        </div>
      </div>
      <div>
        <SongList
          className={styles.songListContainer}
          songList={songList}
          onSongSelect={onSongSelect}
        />
      </div>
    </div>
  );
};

export default MusicList;
