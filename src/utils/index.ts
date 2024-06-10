import CryptoJS from 'crypto-js' // AES/DES加密
import { get, eq } from 'lodash-es'
import { REQUEST_CODE } from './enums'
import type { InitialStateTypes, LockSleepTypes, PageResponse, Response } from '@/utils/types'
import type { RequestData } from '@ant-design/pro-components'

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

/**
 * @description: 判断请求是否成功
 * @author: admin丶
 */
export const isSuccess = (code?: number): boolean => eq(code, REQUEST_CODE.SUCCESS)

/**
 * @description: 格式化请求数据
 * @author: admin丶
 */
export const formatResponse = <T extends any[]>(
  response: Response<T> | Response<PageResponse<T[number]>>,
): RequestData<T[number]> => {
  // 解构响应值
  const { code = 200, data } = response
  return {
    data: get(data, 'list') || get(response, 'data') || [],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'total', 0),
  }
}

/**
 * @description: Tag 标签随机颜色
 * @author: admin丶
 */
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  // Math.floor(Math.random()*(max-min+1))+min 生成[min,max]之间的随机数，包括它们自己
  return colors[Math.floor(Math.random() * (colors.length - 1 - 0 + 1)) + 0]
}

// eslint-disable-next-line @typescript-eslint/ban-types
// 简易的lodash版本的mapValues,
// mapValues({dog:{name:'狗'},cat: {name:'猫'}},(item)=> item.name)  ====> {dog:'狗, cat: '猫'}
export const mapValues = (object: Record<string, any>, fn): Record<string, any> => {
  if (!(typeof fn === 'function')) return object
  const mapObj = {}
  Object.keys(object).forEach((item) => {
    mapObj[item] = fn(object[item])
  })
  return mapObj
}
