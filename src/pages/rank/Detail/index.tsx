import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import InfiniteScroller from 'react-infinite-scroller';

import MusicList from 'shared/components/MusicList';

import SongUsecase from 'shared/domain/song';
import usePagination from 'shared/hooks/usePagination';

import message from 'shared/lib/message';

import { FulfilledRank } from 'shared/domain/song/typings';

import styles from './index.module.scss';

interface RankDetailRouteParamProps {
  type: string;
}

const RankDetail: React.FC<RouteComponentProps<
  RankDetailRouteParamProps
>> = props => {
  const rankType = Number(props.match.params.type);
  const [rank, setRank] = useState<FulfilledRank>();

  const getRankList = async (rankType: number) => {
    try {
      const result = await SongUsecase.getRankList();
      const matched = result.find(item => item.type === rankType);
      setRank(matched);
    } catch (e) {
      message.error(e.message);
    }
  };

  const query = useMemo(() => ({ type: rankType }), [rankType]);

  const { data: songList, loadMore, hasMore } = usePagination({
    type: 'ROLL',
    fetcher: SongUsecase.getRankSongList,
    query,
    onError: e => message.error(e.message)
  });

  const onBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    getRankList(rankType);
  }, [rankType]);

  return (
    <div className={styles.container}>
      <InfiniteScroller
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={false}
        threshold={10}
        useWindow={false}
      >
        <MusicList
          title={rank && rank.name}
          cover={rank && rank.secondPic}
          songList={songList}
          onBack={onBack}
        />
      </InfiniteScroller>
    </div>
  );
};

export default RankDetail;
