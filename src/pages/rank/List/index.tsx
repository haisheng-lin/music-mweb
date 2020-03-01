import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SongUsecase from 'shared/domain/song';
import { FulfilledRank } from 'shared/domain/song/typings';
import { LOCAL_PATHS } from 'shared/constants';

import styles from './index.module.scss';

const RankList: React.FC<RouteComponentProps> = props => {
  const [rankList, setRankList] = useState<FulfilledRank[]>([]);

  const getRankList = async () => {
    try {
      const result = await SongUsecase.getRankList();
      setRankList(result);
    } catch (e) {}
  };

  const onRankClick = (rank: FulfilledRank) => () => {
    props.history.push(LOCAL_PATHS.rank.detail.getPathByParams(rank.type));
  };

  useEffect(() => {
    getRankList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <ul>
          {rankList.map(rank => (
            <li
              key={rank.type}
              className={styles.item}
              onClick={onRankClick(rank)}
            >
              <div className={styles.icon}>
                <img
                  width="100"
                  height="100"
                  src={rank.thirdPic}
                  alt={rank.name}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{rank.name}</span>
                <span className={styles.comment}>{rank.comment}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankList;
