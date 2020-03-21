import React, { useEffect, useRef, TouchEvent } from 'react';
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
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBtnRef = useRef<HTMLDivElement>(null);
  const touch = useRef({
    initiated: false, // 是否在拖动模式中
    startX: -1, // 触发 touchstart 时候鼠标 X 轴位置
    left: -1 // 触发 touchstart 时候进度条长度
  });

  const progressBtnWidth = 16;
  const containerWidth = containerRef.current?.clientWidth || 0;
  const progressMaxWidth = containerWidth - progressBtnWidth; // 因按钮占 16px，故 100% 的长度也只能是总的扣去 16
  const progressCurrentWidth = progressRef.current?.clientWidth || 0; // 当前进度条长度

  const progressTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touch.current.initiated = true;
    touch.current.startX = e.touches[0].pageX;
    touch.current.left = progressCurrentWidth;
  };

  const progressTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].pageX;
    const deltaX = currentX - touch.current.startX; // 如果用户向右拖则为正数，向左则为负数
    const newOffsetWidth = Math.min(
      Math.max(0, touch.current.left + deltaX),
      containerWidth - progressBtnWidth
    );
    offset(newOffsetWidth);
  };

  const progressTouchEnd = () => {
    touch.current.initiated = false;
    const newPercent = progressCurrentWidth / progressMaxWidth;
    onPercentChange && onPercentChange(newPercent);
  };

  const offset = (offsetWidth: number) => {
    if (progressRef.current) {
      progressRef.current.style.width = `${offsetWidth}px`;
    }
    if (progressBtnRef.current) {
      progressBtnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  };

  useEffect(() => {
    // 不在拖动模式时，才自动更新播放条进度
    if (percent >= 0 && !touch.current.initiated) {
      offset(progressMaxWidth * percent);
    }
  }, [percent, touch, progressMaxWidth]);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className]: true
      })}
      ref={containerRef}
    >
      <div className={styles.inner}>
        <div className={styles.progress} ref={progressRef}></div>
        <div
          className={styles.progressBtnWrapper}
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <span className={styles.progressBtn}></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
