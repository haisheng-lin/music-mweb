import React from 'react';
import { Route } from 'react-router-dom';

import { LOCAL_PATHS } from 'shared/constants';

import Recommend from './Recommend';
import SingerList from './singer/List';
import RankList from './rank/List';
import RankDetail from './rank/Detail';

const Routes: React.FC = () => {
  return (
    <>
      <Route
        path={LOCAL_PATHS.recommend.routePath}
        exact
        component={Recommend}
      />
      <Route
        path={LOCAL_PATHS.singer.list.routePath}
        exact
        component={SingerList}
      />
      <Route
        path={LOCAL_PATHS.rank.list.routePath}
        exact
        component={RankList}
      />
      <Route
        path={LOCAL_PATHS.rank.detail.routePath}
        exact
        component={RankDetail}
      />
    </>
  );
};

export default Routes;
