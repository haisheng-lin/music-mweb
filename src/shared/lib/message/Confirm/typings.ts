import React from 'react';

export interface ConfirmOption {
  content: React.ReactNode; // 内容
  confirmText?: string; // 确认按钮文案
  cancelText?: string; // 取消按钮文案
  shouldShowCancelButton?: boolean; // 是否显示取消按钮
  maskClosable?: boolean; // 点击蒙层是否可关闭
  onCancel?: () => void; // 点击取消回调
  onConfirm?: () => void; // 点击确认回调
  onClose?: () => void;
}

export interface ConfirmProps {
  onClose?: () => void;
}

export interface ConfirmRef {
  confirm: (option: ConfirmOption) => void;
}
