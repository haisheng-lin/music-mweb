import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import MessageContainer, { MessageContainerRef } from './Container';

import { MessageType, MessageOption } from './typings';

const containerRef = createRef<MessageContainerRef>();

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<MessageContainer ref={containerRef} />, container);

const createMessage = (
  type: MessageType,
  content: React.ReactNode,
  option?: MessageOption
) => {
  if (containerRef.current) {
    containerRef.current.createMessage(type, content, option);
  }
};

export default {
  success: (content: string, option?: MessageOption) => {
    createMessage('SUCCESS', content, option);
  },
  error: (content: string, option?: MessageOption) => {
    createMessage('ERROR', content, option);
  },
  info: (content: string, option?: MessageOption) => {
    createMessage('INFO', content, option);
  },
  warning: (content: string, option?: MessageOption) => {
    createMessage('WARNING', content, option);
  }
};
