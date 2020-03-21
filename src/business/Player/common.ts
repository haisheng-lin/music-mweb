/**
 * 同步内层 transform 到外层容器
 */
export function syncWrapperTransform(wrapper: HTMLElement, inner: HTMLElement) {
  const innerStyle = getComputedStyle(inner);
  const transformStyle = innerStyle.getPropertyValue('transform');
  wrapper.style.transform = transformStyle;
}
