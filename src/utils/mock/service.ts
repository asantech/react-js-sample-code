import CryptoJS from "crypto-js";

export const SECRET_KEY_MOCK = 'react-sample-app-secret-key'
export const MOCK_RESPONSE_DELAY = 1500

export function hashString(string: string) {
    return CryptoJS.SHA256(string).toString();
}

export const encryptTextWithSecretKey = ({text, secretKey}:{text: string, secretKey: string}) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export const decryptTextWithSecretKey = ({text, secretKey}:{text: string, secretKey: string}) => {
    const decryptedBytes = CryptoJS.AES.decrypt(text, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText
}

export function getValueAfterDelay(value: unknown, delay: number = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}