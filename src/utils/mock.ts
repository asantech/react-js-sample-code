import random from 'lodash/random'

export function getValueAfterDelay(value: any, delay: number = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomStringLastIndex = characters.length - 1
  for (let i = 0; i < length; i++) {
    result += characters[random(0, randomStringLastIndex)];
  }
  return result;
}