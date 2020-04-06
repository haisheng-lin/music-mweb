/**
 * 随机抽取（包含） min 到 max 之间的数
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min); // +1 是保证能取到上限的值
}

/**
 * 把数组元素打乱，经典的 shuffle 算法
 */
export function shuffle<T extends any[]>(array: T): T {
  const res = array.slice() as T;

  for (let i = 0; i < res.length; i++) {
    const j = getRandomInt(0, i);
    const temp = res[i];
    res[i] = array[j];
    res[j] = temp;
  }

  return res;
}

/**
 * 往数组头部插入元素，限制最大长度
 */
export function insertToArray<T>(
  array: T[],
  item: T,
  compare: (item: T) => boolean,
  maxLength: number
) {
  array = array.slice(); // 复制数组，避免影响原数组
  const index = array.findIndex(compare);
  if (index === 0) {
    // 如果存在该数据并且在最前面，则什么都不干
    return array;
  } else if (index > 0) {
    // 如果存在该数据但不是在最前面，则删掉这个数据
    array.splice(index, 1);
  }
  array.unshift(item); // 在数组最前面插入这个值
  if (maxLength && array.length > maxLength) {
    // 如果数组超出最大长度，则删除最后一个
    array.pop();
  }

  return array;
}

/**
 * 从数组删除元素
 */
export function deleteFromArray<T>(array: T[], compare: (item: T) => boolean) {
  array = array.slice(); // 复制数组，避免影响原数组
  const index = array.findIndex(compare);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}

const ua = navigator.userAgent.toLowerCase();
export const isIOS = ['iphone', 'ipad', 'macintosh'].some(
  el => ua.indexOf(el) > -1
);
export const isAndroid = ua.indexOf('android') > -1;
