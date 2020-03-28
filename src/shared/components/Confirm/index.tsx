import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ConfirmProps {
  className?: string;
  visible?: boolean;
  maskClosable?: boolean;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Confirm: React.FC<ConfirmProps> = props => {
  const {
    className = '',
    visible,
    maskClosable,
    content,
    confirmText = '确定',
    cancelText = '取消',
    onConfirm,
    onCancel
  } = props;

  const onMaskClick = () => {
    maskClosable && onConfirm && onConfirm();
  };

  const onFooterClick = (e: MouseEvent<HTMLDivElement>) => {
    // 防止点击事件向 mask 层冒泡
    e.stopPropagation();
  };

  return (
    <div
      className={classNames({
        [styles.mask]: true,
        [className]: true,
        [styles.visible]: visible
      })}
      onClick={onMaskClick}
    >
      <div className={styles.body}>
        <div className={styles.content}>{content}</div>
        <div className={styles.footer} onClick={onFooterClick}>
          <span
            className={classNames({
              [styles.footerBtn]: true,
              [styles.closeBtn]: true
            })}
            onClick={onCancel}
          >
            {cancelText}
          </span>
          <span className={styles.footerBtn} onClick={onConfirm}>
            {confirmText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
