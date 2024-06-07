/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access 参考umi的权限设计来实现
 * */

import { forEach } from 'lodash-es'

import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  const { Permissions, RouteMenu } = initialState ?? {}
  /**
   * @description: 获取当前所有路由
   * @author: admin丶
   */
  const getRouteNames = (tree = RouteMenu): string[] => {
    // 收集当前层级的所有 name 属性
    let result: string[] = []
    // 遍历收集
    forEach(tree, (node: API.MENUMANAGEMENT) => {
      result.push(node.path)
      if (node?.routes?.length) {
        result = result.concat(getRouteNames(node.routes))
      }
    })
    return result
  }
  return {
    // 判断是否有操作权限
    operationPermission: (data: string) => (Permissions ? Permissions.includes(data) : false),
    // 判断是否有权限访问菜单
    adminRouteFilter: (path: string) => {
      const allRouteNames = getRouteNames()
      console.log(allRouteNames, 'allRouteNames', path, 'route.name')

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return allRouteNames.includes(path)
    },
  }
}
