import React from 'react';
import ReactDOM from 'react-dom';

import Modal, { Props as ConfirmOptions } from './Modal';

let container: HTMLElement | null;

function unmountContainer() {
  if (!container) {
    return;
  }
  ReactDOM.unmountComponentAtNode(container);
  if (container.parentNode) {
    container.parentNode.removeChild(container);
    container = null;
  }
}

function onClose(callback?: () => void) {
  callback && callback();
  unmountContainer();
}

function mountContainer() {
  container = document.createElement('div');
  document.body.appendChild(container);
}

function confirm(options: ConfirmOptions) {
  if (!container) {
    mountContainer();
  }

  ReactDOM.render(
    <Modal
      {...options}
      onConfirm={() => onClose(options.onConfirm)}
      onCancel={() => onClose(options.onCancel)}
    />,
    container
  );
}

export default confirm;
