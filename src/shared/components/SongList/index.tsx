import React from 'react';
import classNames from 'classnames';

import { FulfilledSingerSong } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface SongListProps {
  className?: string;
  songList?: FulfilledSingerSong[];
  onSongSelect?: (song: FulfilledSingerSong, index: number) => void;
}

const SongList: React.FC<SongListProps> = props => {
  const { className = '', songList, onSongSelect } = props;

  const onSelect = (song: FulfilledSingerSong, index: number) => () => {
    onSongSelect && onSongSelect(song, index);
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <ul>
        {songList?.map((song, index) => (
          <li
            key={song.songId}
            className={styles.item}
            onClick={onSelect(song, index)}
          >
            <div className={styles.rank}>
              <span className={styles.text}>{index + 1}</span>
            </div>
            <div className={styles.content}>
              <h2 className={styles.name}>{song.songName}</h2>
              <span className={styles.desc}>{song.singerName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
