import CryptoJS from 'crypto-js' // AES/DES加密

/**
 * @description: 获取 localstorage 的值
 * @author: admin丶
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = localStorage.getItem(key)
  // 判断是否为空
  if (item === null) {
    return null
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item)
  return result
}

/**
 * @description: AES/DES密钥
 * @author: admin丶
 */
const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789') // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789') // 十六位十六进制数作为密钥偏移量

/**
 * @description: AES/DES加密
 * @param {string} password
 * @Author: admin丶
 */
export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString() // 返回的是base64格式的密文
}
