/**
 * 获取元素某样式属性
 */
function getStyle(element: HTMLElement, prop: string) {
  return getComputedStyle(element, prop).getPropertyValue(prop);
}

/**
 * 获取元素 overflow 属性
 */
function getOverflowStyle(element: HTMLElement) {
  return (
    getStyle(element, 'overflow') +
    getStyle(element, 'overflow-x') +
    getStyle(element, 'overflow-y')
  );
}

/**
 * 找到指定元素最近的可滚动的父级元素
 * https://github.com/twobin/react-lazyload/blob/master/src/utils/scrollParent.js
 */
export function findScrollableParant(element: HTMLElement) {
  let parent = element;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    } else if (!parent.parentNode) {
      break;
    } else if (/(scroll|auto)/.test(getOverflowStyle(parent))) {
      return parent;
    }

    parent = parent.parentNode as HTMLElement;
  }

  return document;
}

/**
 * 判断元素是否在视口内
 */
export function isInViewport(element: HTMLElement) {
  const scroll = window.scrollY || window.pageYOffset; // 当前页面往下滚动了多少 px
  /**
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
   * ele.getBoundingClientRect().top 表示元素顶部相对于当前视口的高度差
   * 加上 scroll 就是指元素顶部离页面顶部的高度差
   */
  const boundsTop = element.getBoundingClientRect().top + scroll;
  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  const bounds = {
    top: boundsTop, // 元素顶部离页面顶部的高度差
    bottom: boundsTop + element.clientHeight // 元素底部离页面顶部的高度差
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) || // 元素下半部在 viewport 中
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  ); // 元素上半部在 viewport 中
}
