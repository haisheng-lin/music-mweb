import React from 'react';
import classNames from 'classnames';

import { FulfilledSingerSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface SongListProps {
  className?: string;
  songList?: FulfilledSingerSong[];
}

const SongList: React.FC<SongListProps> = props => {
  const { className = '', songList } = props;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <ul>
        {songList?.map((song, index) => (
          <li key={song.songId} className={styles.item}>
            <div className={styles.rank}>
              <span className={styles.text}>{index + 1}</span>
            </div>
            <div className={styles.content}>
              <h2 className={styles.name}>{song.songName}</h2>
              <p className={styles.desc}>{song.singerName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
