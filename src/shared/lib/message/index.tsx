import React, { createRef } from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';
import { ToastRef } from './Toast/typings';

import { MessageType, ToastOption } from './typings';

interface Instance {
  container: HTMLElement;
  instance: any;
  onClose?: () => void;
}

const toastRef = createRef<ToastRef>();
const instanceMap = new Map<MessageType, Instance>();

const mountInstance = (
  type: MessageType,
  component: JSX.Element,
  option: ToastOption
) => {
  const value = instanceMap.get(type);
  if (value) {
    value.onClose = option.onClose;
    return;
  }
  const container = document.createElement('div');
  container.setAttribute('id', type);
  document.body.appendChild(container);
  instanceMap.set(type, {
    container,
    instance: component,
    onClose: option.onClose,
  });
  ReactDOM.render(component, container);
};

const noticeHandler = (
  type: MessageType,
  component: JSX.Element,
  option: ToastOption
) => {
  mountInstance(type, component, option);
  switch (type) {
    case 'TOAST': {
      if (toastRef.current) {
        return toastRef.current.info(option);
      }
      break;
    }
  }
};

const unmountInstance = (type: MessageType) => {
  const value = instanceMap.get(type);
  if (!value) {
    return;
  }
  ReactDOM.unmountComponentAtNode(value.container);
  document.body.removeChild(value.container);
  instanceMap.delete(type);
  value.onClose && value.onClose();
};

const onToastClose = () => {
  unmountInstance('TOAST');
};

export default {
  info: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
    return noticeHandler(
      'TOAST',
      <Toast onClose={onToastClose} ref={toastRef} />,
      {
        content,
        duration,
        onClose,
      }
    );
  },
};
