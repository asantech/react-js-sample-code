import CryptoJS from "crypto-js";

export function hashString(string: string) {
    return CryptoJS.SHA256(string).toString();
}