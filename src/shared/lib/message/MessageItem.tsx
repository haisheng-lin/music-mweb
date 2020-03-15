import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Message } from './typings';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  message: Message;
  onDestroy: (messageId: string) => void;
}

const MessageItem: React.FC<Props> = props => {
  const {
    className = '',
    message: { id, content, option },
    onDestroy
  } = props;

  const duration = option?.duration || 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDestroy(id);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [onDestroy, id, duration]);

  return (
    <div
      className={classNames({
        [styles.message]: true,
        [className]: true
      })}
    >
      <main className={styles.content}>{content}</main>
    </div>
  );
};

export default MessageItem;
