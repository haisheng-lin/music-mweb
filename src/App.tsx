import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Container from 'shared/container';

import Header from 'shared/components/Header';
import Tabs from 'shared/components/Tabs';
import Player from 'business/Player';
import Routes from 'pages/Routes';

import { LOCAL_PATHS, BASE_NAME } from 'shared/constants';

import 'assets/styles/reset.scss';
import 'assets/styles/base.scss';
import 'assets/styles/icon.scss';

const VConsole = require('vconsole/dist/vconsole.min.js');
new VConsole();

const App: React.FC = () => {
  const tabs = [
    { label: '推荐', path: LOCAL_PATHS.recommend.routePath },
    { label: '歌手', path: LOCAL_PATHS.singer.list.routePath },
    { label: '排行', path: LOCAL_PATHS.rank.list.routePath },
    { label: '搜索', path: LOCAL_PATHS.search.routePath }
  ];

  return (
    <Container.Provider>
      <Header />
      <Router basename={BASE_NAME}>
        <Tabs tabs={tabs} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={LOCAL_PATHS.recommend.routePath} />}
          />
          <Routes />
        </Switch>
      </Router>
      <Player />
    </Container.Provider>
  );
};

export default App;
