import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  MouseEvent,
} from 'react';
import classNames from 'classnames';

import { ConfirmProps, ConfirmRef, ConfirmOption } from './typings';

import styles from './index.module.scss';

const animationDuration = 400; // 动画过渡时间，毫秒
const noop = () => {};

const Confirm = forwardRef<ConfirmRef, ConfirmProps>((props, ref) => {
  const { onClose = noop } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const option = useRef<ConfirmOption>();

  const {
    shouldShowCancelButton = true,
    maskClosable = true,
    onCancel = noop,
    onConfirm = noop,
    cancelText = '取消',
    confirmText = '确定',
  } = option.current || {};

  const onFooterClick = (e: MouseEvent<HTMLDivElement>) => {
    // 防止点击事件向 mask 层冒泡
    e.stopPropagation();
  };

  const cancelClick = () => {
    onCancel();
    setVisible(false);
  };

  const confirmClick = () => {
    onConfirm();
    setVisible(false);
  };

  const onMaskClick = () => {
    if (maskClosable) {
      cancelClick();
    }
  };

  useImperativeHandle(ref, () => ({
    confirm: (data: ConfirmOption) => {
      const { content } = data;
      setTimeout(() => {
        setContent(content);
        setVisible(true);
      }, 20);
      option.current = data;
    },
  }));

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, animationDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, onClose]);

  return (
    <div
      className={classNames({
        [styles.mask]: true,
        [styles.visible]: visible,
      })}
      onClick={onMaskClick}
    >
      <div className={styles.body}>
        <div className={styles.content}>{content}</div>
        <div className={styles.footer} onClick={onFooterClick}>
          {shouldShowCancelButton && (
            <span
              className={classNames({
                [styles.footerBtn]: true,
                [styles.closeBtn]: true,
              })}
              onClick={cancelClick}
            >
              {cancelText}
            </span>
          )}
          <span className={styles.footerBtn} onClick={confirmClick}>
            {confirmText}
          </span>
        </div>
      </div>
    </div>
  );
});

export default Confirm;
