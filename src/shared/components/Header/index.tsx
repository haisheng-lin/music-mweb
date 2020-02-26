import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface HeaderProps {
  onUserIconClick?: () => void;
}

const Header: React.FC<HeaderProps> = props => {
  const { onUserIconClick } = props;

  const onClick = () => {
    onUserIconClick && onUserIconClick();
  };

  return (
    <header className={styles.header}>
      <i className={styles.icon} />
      <h1 className={styles.text}>大力音乐</h1>
      <div className={styles.mine}>
        <i
          className={classNames({
            'icon-mine': true,
            [styles.iconMine]: true
          })}
          onClick={onClick}
        />
      </div>
    </header>
  );
};

export default Header;
