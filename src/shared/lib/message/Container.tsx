import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';

import MessageItem from './MessageItem';
import { MessageType, Message, MessageOption } from './typings';
import { generateRandomString } from './utils';

import styles from './styles.module.scss';

export interface MessageContainerRef {
  createMessage: (
    type: MessageType,
    content: React.ReactNode,
    option?: MessageOption
  ) => void;
}

const MessageContainer = forwardRef<MessageContainerRef>((_, ref) => {
  const [message, setMessage] = useState<Message>();

  const generateMessageId = () => {
    return `${Date.now()}-${generateRandomString()}`;
  };

  useImperativeHandle(ref, () => ({
    createMessage: (
      type: MessageType,
      content: React.ReactNode,
      option?: MessageOption
    ) => {
      const messageId = generateMessageId();
      setMessage({
        id: messageId,
        type,
        content,
        option
      });
    }
  }));

  const destroyMessage = useCallback((messageId: string) => {
    setMessage(undefined);
  }, []);

  return (
    <div className={styles.container}>
      {message && <MessageItem message={message} onDestroy={destroyMessage} />}
    </div>
  );
});

export default MessageContainer;
