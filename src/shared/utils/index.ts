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
