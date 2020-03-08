import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import InfiniteScroller from 'react-infinite-scroller';

import usePagination from 'shared/hooks/usePagination';

import SongUsecase from 'shared/domain/song';
import { FulfilledSingerDetail } from 'shared/domain/song/typings';
import MusicList from 'shared/components/MusicList';

import styles from './index.module.scss';

interface RouteParams {
  id?: string;
}

const SingerDetail: React.FC<RouteComponentProps<RouteParams>> = props => {
  const singerId = props.match.params.id;

  const [singer, setSinger] = useState<FulfilledSingerDetail>();

  const query = useMemo(() => ({ singerId: singerId || '' }), [singerId]);

  const { data: songList, loadMore, hasMore } = usePagination({
    type: 'ROLL',
    fetcher: SongUsecase.getSingerSongList,
    query,
    onError: e => console.log(e.message),
    disabled: !singerId
  });

  const getSingerDetail = async (singerId: string) => {
    try {
      const result = await SongUsecase.getSingerDetail(singerId);
      setSinger(result);
    } catch (e) {}
  };

  const onBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (singerId) {
      getSingerDetail(singerId);
    }
  }, [singerId]);

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
          title={singer && singer.singerName}
          cover={singer && singer.avatar}
          songList={songList}
          onBack={onBack}
        />
      </InfiniteScroller>
    </div>
  );
};

export default SingerDetail;
