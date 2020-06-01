import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';

import { ToastProps, ToastRef, ToastOption } from './typings';

import styles from './index.module.scss';

const animationDuration = 400; // 动画过渡时间，毫秒

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { onClose } = props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const option = useRef<ToastOption>();
  const timer = useRef<NodeJS.Timeout>();

  useImperativeHandle(ref, () => ({
    info: (data: ToastOption) => {
      const { content } = data;
      setTimeout(() => {
        setContent(content);
        setVisible(true);
      }, 20);
      option.current = data;
    },
  }));

  useEffect(() => {
    if (visible && option.current) {
      const { duration = 2 } = option.current;
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setVisible(false);
        option.current = undefined;
      }, duration * 1000);
    } else if (!visible && !option.current) {
      setTimeout(() => {
        onClose && onClose();
      }, animationDuration);
    }
  }, [visible, onClose, content]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.visible]: visible,
      })}
    >
      <span className={styles.content}>{content}</span>
    </div>
  );
});

export default Toast;
