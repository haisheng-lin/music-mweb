import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface VirtualListOption<T> {
  rowKey: (item: T) => string | number | undefined;
  itemHeight: number;
  displayCount: number;
  render: (item: T) => React.ReactNode;
}

interface VirtualListProps<T = any> {
  className?: string;
  data: T[];
  option: VirtualListOption<T>;
}

const VirtualList: React.FC<VirtualListProps> = props => {
  const {
    className,
    data,
    option: { rowKey, itemHeight, displayCount, render }
  } = props;
  const [displayItems, setDisplayItems] = useState<
    { data: any; index: number }[]
  >([]);
  const containerHeight = displayCount * itemHeight; // 容器高度
  const actualHeight = data.length * itemHeight; // 撑开容器的实际高度

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLElement)?.scrollTop;
    const firstIndex = Math.min(
      Math.floor(scrollTop / itemHeight),
      data.length - 1
    );
    const lastIndex = Math.min(firstIndex + displayCount - 1, data.length - 1);

    const nextDisplayItems = data
      .slice(firstIndex, lastIndex + 1)
      .map((item, index) => ({
        data: item,
        index: firstIndex + index
      }));
    setDisplayItems(nextDisplayItems);
  };

  useEffect(() => {
    setDisplayItems(
      data.slice(0, displayCount).map((item, index) => ({
        data: item,
        index
      }))
    );
  }, [data, displayCount]);

  return (
    <div
      className={classNames(styles.container, className)}
      style={{ maxHeight: `${containerHeight}px` }}
      onScroll={onScroll}
    >
      <div style={{ height: `${actualHeight}px` }}>
        {displayItems.map(item => (
          <div
            key={rowKey(item.data)}
            className={styles.item}
            style={{ transform: `translateY(${itemHeight * item.index}px)` }}
          >
            {render(item.data)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
