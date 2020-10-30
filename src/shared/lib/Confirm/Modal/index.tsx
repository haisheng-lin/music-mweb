import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import classNames from 'classnames';

import './index.less';

export interface Props {
  content?: React.ReactNode;
  maskClosable?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function noop() {}

const Confirm: React.FC<Props> = ({
  content,
  maskClosable,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm = noop,
  onCancel = noop,
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmState, setConfirmState] = useState<'CONFIRM' | 'CANCEL'>();
  const timerRef = useRef<any>(null);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 50);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const onAnimationEnd = () => {
    switch (confirmState) {
      case 'CONFIRM': {
        onConfirm();
        break;
      }
      case 'CANCEL': {
        onCancel();
        break;
      }
    }
  };

  const onMaskClick = () => {
    if (maskClosable) {
      onCancel();
    }
  };

  const onFooterClick = (e: MouseEvent<HTMLElement>) => {
    // 防止点击事件向 mask 层冒泡
    e.stopPropagation();
  };

  const onConfirmClick = () => {
    setConfirmState('CONFIRM');
    setVisible(false);
  };

  const onCancelClick = () => {
    setConfirmState('CANCEL');
    setVisible(false);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <div
      className={classNames({
        mask: true,
        visible: visible,
      })}
      onClick={onMaskClick}
    >
      <div className='body' onAnimationEnd={onAnimationEnd}>
        <div className='content'>{content}</div>
        <div className='footer' onClick={onFooterClick}>
          <span
            className={classNames({
              btn: true,
              close: true,
            })}
            onClick={onCancelClick}
          >
            {cancelText}
          </span>
          <span className='btn' onClick={onConfirmClick}>
            {confirmText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
