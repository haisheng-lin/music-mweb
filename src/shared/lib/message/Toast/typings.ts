export interface ToastOption {
  content: React.ReactNode; // 内容
  duration?: number; // 时长，毫秒
  onClose?: () => void;
}

export interface ToastProps {
  onClose?: () => void;
}

export interface ToastRef {
  info: (option: ToastOption) => void;
}
