import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import InfiniteScroller from 'react-infinite-scroller';

import Container from 'shared/container';
import usePagination from 'shared/hooks/usePagination';

import SongUsecase from 'shared/domain/song';
import {
  FulfilledSingerDetail,
  FulfilledSingerSong
} from 'shared/domain/song/typings';
import MusicList from 'shared/components/MusicList';

import message from 'shared/lib/message';

import styles from './index.module.scss';

interface RouteParams {
  id?: string;
}

const SingerDetail: React.FC<RouteComponentProps<RouteParams>> = props => {
  const singerId = props.match.params.id;
  const { selectPlay } = Container.useContainer();

  const [singer, setSinger] = useState<FulfilledSingerDetail>();

  const query = useMemo(() => (singerId ? { singerId } : undefined), [
    singerId
  ]);

  const { data: songList, loadMore, hasMore } = usePagination({
    type: 'ROLL',
    fetcher: SongUsecase.getSingerSongList,
    query,
    onError: e => message.error(e.message),
    disabled: !singerId
  });

  const getSingerDetail = async (singerId: string) => {
    try {
      const result = await SongUsecase.getSingerDetail(singerId);
      setSinger(result);
    } catch (e) {
      message.error(e.message);
    }
  };

  const onBack = () => {
    props.history.goBack();
  };

  const onSongSelect = (_: FulfilledSingerSong, index: number) => {
    selectPlay(
      songList.map(song => ({
        singerName: song.singerName,
        songId: song.songId,
        songName: song.songName,
        image: song.songPic
      })),
      index
    );
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
          onSongSelect={onSongSelect}
        />
      </InfiniteScroller>
    </div>
  );
};

export default SingerDetail;
