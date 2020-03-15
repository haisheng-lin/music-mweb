/**
 * 生成随机字符串
 */
export const generateRandomString = (length: number = 5) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  return Array(length)
    .fill(null)
    .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
    .join('');
};
