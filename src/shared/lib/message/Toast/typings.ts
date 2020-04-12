import { ToastOption } from '../typings';

export interface ToastProps {
  onClose?: () => void;
}

export interface ToastRef {
  info: (option: ToastOption) => void;
}
