import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import InfiniteScroller from 'react-infinite-scroller';

import MusicList from 'shared/components/MusicList';

import SongUsecase from 'shared/domain/song';
import usePagination from 'shared/hooks/usePagination';

import styles from './index.module.scss';

interface RankDetailRouteParamProps {
  type: string;
}

const RankDetail: React.FC<RouteComponentProps<
  RankDetailRouteParamProps
>> = props => {
  const rankType = props.match.params.type;

  const query = useMemo(
    () => ({
      type: Number(rankType)
    }),
    [rankType]
  );

  const { data: songList, loadMore, hasMore } = usePagination({
    type: 'ROLL',
    fetcher: SongUsecase.getRankSongList,
    query,
    onError: e => console.log(e.message)
  });

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
          title="巅峰帮"
          cover="https://y.gtimg.cn/music/photo_new/T002R300x300M000003dYaaO2IxmpP.jpg?max_age=2592000"
          songList={songList}
        />
      </InfiniteScroller>
    </div>
  );
};

export default RankDetail;
