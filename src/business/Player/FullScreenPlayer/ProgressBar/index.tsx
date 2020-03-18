import React, { useRef } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ProgressBarProps {
  className?: string;
  percent?: number;
  onPercentChange?: (percent: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = props => {
  const { className = '', percent = 0, onPercentChange } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const progressBtnWidth = 16;

  const containerWidth = containerRef.current?.clientWidth || 0;
  const barWidth = containerWidth - progressBtnWidth; // 因按钮占 16px，故 100% 的长度也只能是总的扣去 16
  const offsetWidth = barWidth * percent;

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
      ref={containerRef}
    >
      <div className={styles.inner}>
        <div
          className={styles.progress}
          style={{
            width: offsetWidth
          }}
        ></div>
        <div
          className={styles.progressBtnWrapper}
          style={{
            transform: `translate3d(${offsetWidth}px, 0, 0)`
          }}
        >
          <span className={styles.progressBtn}></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
