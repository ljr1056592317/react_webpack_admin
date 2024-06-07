import httpRequest from '@/utils/request'

import type { SearchParams } from '@/utils/types/system/menu-management'

import { ROUTES } from '@/utils/enums'

const baseURL = ROUTES.MENUMANAGEMENT

/**
 * @description:  获取菜单列表
 * @param {SearchParams} options
 * @Author: admin丶
 */

export const getMenuList = (options?: SearchParams) => httpRequest.get<API.MENUMANAGEMENT[]>(`${baseURL}`, options)

/**
 * @description: 新增菜单数据
 * @param {Partial<API.MENUMANAGEMENT>} options
 * @Author: admin丶
 */
export const createMenu = (options: Partial<API.MENUMANAGEMENT>) =>
  httpRequest.post<API.MENUMANAGEMENT>(`${baseURL}`, options)

/**
 * @description: 更新菜单数据
 * @param {API.MENUMANAGEMENT} options
 * @Author: admin丶
 */
export const updateMenu = ({ menu_id, ...options }: API.MENUMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${menu_id}`, options)

/**
 * @description: 删除菜单数据
 * @param {string} menu_id
 * @Author: admin丶
 */
export const delMenu = (menu_id: string) => httpRequest.delete<number>(`${baseURL}/${menu_id}`)
