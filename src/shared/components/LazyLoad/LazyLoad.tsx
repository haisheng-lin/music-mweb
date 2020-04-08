import React, { useState, useEffect, useCallback, useRef } from 'react';

import { findScrollableParant, isInViewport, throttle } from './utils';
import { LoadState } from './typings';

interface LazyLoadProps {
  loading?: React.ReactNode;
  error?: React.ReactNode;
}

const events = [
  'scroll',
  'wheel',
  'mousewheel',
  'resize',
  'animationend',
  'transitionend',
  'touchmove',
  'transitioncancel'
];

const delay = 300;

const LazyLoad: React.FC<LazyLoadProps> = props => {
  const { loading, error } = props;
  const [state, setState] = useState(LoadState.loading);
  const ref = useRef<HTMLDivElement>(null);

  const lazyHandler = useCallback(
    throttle(async () => {
      try {
        if (
          ref.current &&
          isInViewport(ref.current) &&
          state === LoadState.loading
        ) {
          setState(LoadState.loaded);
        }
      } catch (e) {
        setState(LoadState.error);
      }
    }, delay),
    [state]
  );

  const addListeners = useCallback(
    (element: HTMLElement | Document) => {
      events.forEach(event => {
        element.addEventListener(event, lazyHandler);
      });
    },
    [lazyHandler]
  );

  const removeListeners = useCallback(
    (element: HTMLElement | Document) => {
      events.forEach(event => {
        element.removeEventListener(event, lazyHandler);
      });
    },
    [lazyHandler]
  );

  useEffect(() => {
    try {
      if (
        ref.current &&
        isInViewport(ref.current) &&
        state === LoadState.loading
      ) {
        setState(LoadState.loaded);
      }
    } catch (e) {
      setState(LoadState.error);
    }
  }, [state]);

  useEffect(() => {
    const parent = ref.current ? findScrollableParant(ref.current) : null;
    parent && state === LoadState.loading && addListeners(parent);

    return () => {
      parent && removeListeners(parent);
    };
  }, [addListeners, removeListeners, state]);

  return (
    <div ref={ref}>
      {state === LoadState.loading
        ? loading
        : state === LoadState.error
        ? error
        : props.children}
    </div>
  );
};

export default LazyLoad;
