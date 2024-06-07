import { ROUTES } from '@/utils/enums'
import type { PageResponse, SearchTimes } from '@/utils/types'
import httpRequest from '@/utils/request'

const baseURL = ROUTES.OPERATIONLOG

/**
 * @description: 操作日志列表
 * @param {SearchParams} options
 * @Author: admin丶
 */
export const getOperationLogList = (options?: SearchTimes) =>
  httpRequest.get<PageResponse<API.OPERATIONLOG>>(`${baseURL}`, options)
