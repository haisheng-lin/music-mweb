import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SongUsecase from 'shared/domain/song';
import { FulfilledSinger } from 'shared/domain/song/typings';
import { LOCAL_PATHS } from 'shared/constants';

import message from 'shared/lib/message';

import styles from './index.module.scss';

const SingerList: React.FC<RouteComponentProps> = props => {
  const [singerList, setSingerList] = useState<FulfilledSinger[]>([]);

  const searchSingerList = async () => {
    try {
      const result = await SongUsecase.searchSingerList('z');
      setSingerList(result);
    } catch (e) {
      message.error(e.message);
    }
  };

  const onSingerClick = (singer: FulfilledSinger) => () => {
    props.history.push(
      LOCAL_PATHS.singer.detail.getPathByParams(singer.singerId)
    );
  };

  useEffect(() => {
    searchSingerList();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {singerList.map(singer => (
          <li
            key={singer.singerId}
            className={styles.item}
            onClick={onSingerClick(singer)}
          >
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
