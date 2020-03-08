import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Container from 'shared/container';

import Header from 'shared/components/Header';
import Tabs from 'shared/components/Tabs';
import Routes from 'pages/Routes';

import { LOCAL_PATHS } from 'shared/constants';

import 'assets/styles/index.scss';

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
      <Router>
        <Tabs tabs={tabs} />
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </Container.Provider>
  );
};

export default App;
