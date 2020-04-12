import React from 'react';

export interface ToastOption {
  content: React.ReactNode; // 内容
  duration?: number; // 时长，毫秒
  onClose?: () => void;
}

export interface ConfirmOption {
  content: React.ReactNode; // 内容
  title?: React.ReactNode; // 标题
  confirmText?: string; // 确认按钮文案
  cancelText?: string; // 取消按钮文案
  shouldShowCancelButton?: boolean; // 是否显示取消按钮
  maskClosable?: boolean; // 点击蒙层是否可关闭
  onCancel?: () => void; // 点击取消回调
  onConfirm?: () => void; // 点击确认回调
}

export type MessageType = 'TOAST' | 'CONFIRM';
