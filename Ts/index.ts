import CryptoJS from "crypto-js";
export const isPcScreen = (): boolean => {
  console.log(window.innerWidth);
  return window.innerWidth > 1170;
};
window.onload = () => {
  isPcScreen();
};
export const aes_decrypt = async (ciphertext, key) => {
  var data = CryptoJS.enc.Base64.parse(ciphertext);
  var iv = CryptoJS.lib.WordArray.create(data.words.slice(0, 4)); 
  var encrypted = CryptoJS.lib.WordArray.create(data.words.slice(4));
  var decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, CryptoJS.enc.Utf8.parse(key), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
export const formatNumber = (numX: number): string => {
  let num = Number(numX);
  if (num === null || num === undefined || num == 0) {
    return "0";
  }
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`;
  } else if (num >= 1) {
    return num.toFixed(2);
  } else if (num >= 0.01) {
    return num.toFixed(4);
  } else {
    const str = num.toFixed(20).toString();
    const decimalIndex = str.indexOf(".");
    if (decimalIndex !== -1) {
      const zeros = str.substring(decimalIndex + 1).match(/^0+/);
      const digits = str.substring(decimalIndex + 1).replace(/^0+/, "");
      if (zeros) {
        return `0.0{${zeros[0].length}}${digits.slice(0, 4)}`;
      } else {
        return `0.${digits.slice(0, 4)}`;
      }
    } else {
      return str;
    }
  }
};
