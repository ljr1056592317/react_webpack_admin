import axios, { type AxiosRequestConfig } from 'axios'
import Nprogress from 'nprogress'
import { getLocalStorageItem } from '../index'
import { LOCAL_STORAGE, REQUEST_CODE } from '../enums'
import { debounce } from 'lodash-es'
import 'nprogress/nprogress.css'
import { message } from 'antd'
import type { Response } from '@/utils/types'

/**
 * @description: 防抖函数统一处理异常错误,单位时间内只显示最新的错误信息
 *
 */
const debounceError = debounce((content: string, duration = 3) => {
  message.error(content, duration)
}, 300)

/**
 * @description 封装统一请求
 */
const service = axios.create({
  baseURL: '/api', // 请求的基地址
  timeout: 5 * 1000, // 超时时间，默认 30 s
  // 设置请求头的内容
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})
// 添加常用的拦截器--请求拦截器和响应拦截器
// 请求拦截器
service.interceptors.request.use((config) => {
  // 该请求是否需要token
  const notToken = config.headers && config.headers.notToken === true
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
  // token存在并且需要token，则在请求头上带上token
  if (ACCESS_TOKEN && !notToken) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
  }
  Nprogress.start()
  return config
})

// 响应拦截器中错误的处理回调
const responseErrorHandle = (error: any) => {
  console.log('err' + error)
  let { message: msg } = error
  if (msg === 'Network Error') {
    msg = '后端接口连接异常'
  } else if (msg.includes('timeout')) {
    msg = '系统接口请求超时'
  } else if (msg.includes('Request failed with status code')) {
    msg = '系统接口' + msg.substr(msg.length - 3) + '异常'
  }
  message.error(error.message as string)
  return Promise.reject(new Error('error---服务错误了'))
}

service.interceptors.response.use((response) => {
  // 未设置状态码则默认成功状态
  const { data, request } = response
  const code = data.code || 200
  Nprogress.done()
  // 二进制数据则直接返回
  if (request.responseType === 'blob' || request.responseType === 'arraybuffer') {
    return data
  }
  if (code === 200) {
    return data
  } else {
    // 401权限 --登录信息失效
    if (code === REQUEST_CODE.UNAUTHORIZED) {
      // 退出登录返回到登录页
    }
    debounceError(JSON.stringify(data.msg))
    return Promise.reject(new Error('error'))
  }
}, responseErrorHandle)

/**
 * @description: 导出封装的请求方法
 */
export const httpRequest = {
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service(url, { method: 'GET', params: data, ...config })
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service(url, { method: 'POST', data, ...config })
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service(url, { method: 'PUT', data, ...config })
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service(url, { method: 'DELETE', data, ...config })
  },

  patch<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Response<T>> {
    return service(url, { method: 'PATCH', data, ...config })
  },
}

export default httpRequest
