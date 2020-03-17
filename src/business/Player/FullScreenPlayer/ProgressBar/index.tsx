import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ProgressBarProps {
  className?: string;
  percent?: number;
  onPercentChange?: (percent: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = props => {
  const { className = '', percent, onPercentChange } = props;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <div className={styles.inner}>
        <div className={styles.progress}></div>
        <div className={styles.progressBtnWrapper}>
          <span className={styles.progressBtn}></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
