/**
 * 节流函数
 */
export function throttle<T extends any[]>(
  callback: (...args: T) => any,
  delay: number
) {
  let lastRuntime = 0;

  return function(...args: T) {
    const gap = Date.now() - lastRuntime;

    if (gap >= delay) {
      lastRuntime = Date.now();
      callback(...args);
    }
  };
}
