import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SongUsecase from 'shared/domain/song';
import { FulfilledSinger } from 'shared/domain/song/typings';

import styles from './index.module.scss';

const SingerList: React.FC<RouteComponentProps> = props => {
  const [singerList, setSingerList] = useState<FulfilledSinger[]>([]);

  const searchSingerList = async () => {
    try {
      const result = await SongUsecase.searchSingerList('z');
      setSingerList(result);
    } catch (e) {}
  };

  useEffect(() => {
    searchSingerList();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {singerList.map(singer => (
          <li key={singer.singerId} className={styles.item}>
            <img
              src={singer.singerPic}
              alt={singer.singerName}
              className={styles.avatar}
            />
            <span className={styles.name}>{singer.singerName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingerList;
