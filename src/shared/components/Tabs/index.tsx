import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';

interface Tab {
  label: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = props => {
  const { tabs } = props;

  return (
    <div className={styles.tab}>
      {tabs.map(tab => (
        <NavLink key={tab.path} to={tab.path} className={styles.item}>
          <span className={styles.link}>{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
