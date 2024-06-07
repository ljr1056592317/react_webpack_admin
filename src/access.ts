/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access 参考umi的权限设计来实现
 * */

import { forEach } from 'lodash-es'

import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  const { Permissions, RouteMenu = [] } = initialState ?? {}
  /**
   * @description: 获取当前所有路由路径，进行拉平方便管理
   * @author: admin丶
   */
  const getRoutePaths = (tree = RouteMenu): string[] => {
    let result: string[] = []
    tree.forEach((item) => {
      result.push(item.path)
      if (item?.routes?.length) {
        result = result.concat(getRoutePaths(item.routes))
      }
    })
    return result
  }
  const allRoutePaths = getRoutePaths()
  return {
    // 判断是否有操作权限
    operationPermission: (data: string) => (Permissions ? Permissions.includes(data) : false),
    // 判断是否有权限访问菜单
    adminRouteFilter: (path: string) => {
      return allRoutePaths.includes(path)
    },
  }
}
