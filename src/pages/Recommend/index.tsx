import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SongUsecase from 'shared/domain/song';
import { FulfilledRecommendSong } from 'shared/domain/song/typings';

import message from 'shared/lib/message';

import styles from './index.module.scss';

const Recommend: React.FC<RouteComponentProps> = props => {
  const [recommendList, setRecommendList] = useState<FulfilledRecommendSong[]>(
    []
  );

  const getRecommendList = async () => {
    try {
      const result = await SongUsecase.getRecommendList();
      setRecommendList(result);
    } catch (e) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    getRecommendList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.listTitle}>热门歌单推荐</h1>
        <ul>
          {recommendList.map(item => (
            <li key={item.songId} className={styles.item}>
              <div className={styles.icon}>
                <img
                  src={item.smallSongPic}
                  width="60"
                  height="60"
                  alt={item.songName}
                />
              </div>
              <div className={styles.text}>
                <h2 className={styles.name}>{item.singerName}</h2>
                <span className={styles.desc}>{item.songName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommend;
