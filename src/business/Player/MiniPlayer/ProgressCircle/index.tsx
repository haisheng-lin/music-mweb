import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ProgressCircleProps {
  className?: string;
  radius?: number;
  percent?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = props => {
  const { className = '', radius = 100, percent = 0, children } = props;

  const dashArray = Math.PI * 100;
  const dashOffset = (1 - percent) * dashArray;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
    >
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1">
        <circle
          className={styles.background}
          cx="50"
          cy="50"
          r="50"
          fill="transparent"
        />
        <circle
          className={styles.progress}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressCircle;
