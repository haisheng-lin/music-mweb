import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import './index.less';

interface Props {
  className?: string;
  id: number;
  content?: React.ReactNode;
  duration?: number;
  onClose?: (id: number) => void;
}

function noop() {}

const Item: React.FC<Props> = ({
  className = '',
  id,
  content,
  duration = 2,
  onClose = noop,
}) => {
  // mount -> visible -> invisible -> onClose -> unmount
  const [visible, setVisible] = useState(false);

  const visibleTimerRef = useRef<any>(null);
  const invisibleTimerRef = useRef<any>(null);

  const onTransitionEnd = () => {
    if (visible) {
      startInvisibleTimer();
    } else {
      onClose(id);
    }
  };

  const startVisibleTimer = () => {
    visibleTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, 50);
  };

  const startInvisibleTimer = () => {
    invisibleTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration * 1000);
  };

  const clearTimer = () => {
    if (visibleTimerRef.current) {
      clearTimeout(visibleTimerRef.current);
      visibleTimerRef.current = null;
    }
    if (invisibleTimerRef.current) {
      clearTimeout(invisibleTimerRef.current);
      invisibleTimerRef.current = null;
    }
  };

  useEffect(() => {
    startVisibleTimer();

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <div
      className={classNames({
        [className]: true,
        content: true,
        visible,
      })}
      onTransitionEnd={onTransitionEnd}
    >
      {content}
    </div>
  );
};

export default Item;
