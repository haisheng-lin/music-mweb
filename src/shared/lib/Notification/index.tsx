import React from 'react';
import ReactDOM from 'react-dom';

import Message from './Item';

interface NoticeOptions {
  content: React.ReactNode;
  duration?: number;
}

let container: HTMLElement;
let messageKey = 0;
const messageBodyMap: Map<number, HTMLElement> = new Map();

const getNewMessageKey = () => messageKey++;

function mountContainer() {
  container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '50%';
  container.style.transform = 'translateX(-50%)';
  document.body.appendChild(container);
}

function onClose(messageId: number) {
  const body = messageBodyMap.get(messageId);
  if (body) {
    ReactDOM.unmountComponentAtNode(body);
    container.removeChild(body);
  }
}

function notice(message: string): void;
function notice(options: NoticeOptions): void;

function notice(params: string | NoticeOptions) {
  if (!container) {
    mountContainer();
  }

  const messageId = getNewMessageKey();
  const body = document.createElement('div');
  body.style.marginTop = '12px';
  container.appendChild(body);
  messageBodyMap.set(messageId, body);

  const props =
    typeof params === 'string'
      ? {
          id: messageId,
          onClose,
          content: params,
        }
      : {
          id: messageId,
          onClose,
          duration: params.duration,
          content: params.content,
        };

  ReactDOM.render(<Message {...props} />, body);
}

const destroy = () => {
  messageBodyMap.clear();
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
};

export default {
  info: notice,
  destroy,
};
