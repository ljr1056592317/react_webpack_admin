import React from 'react'
import { useStores } from '@/store'

type AccessProps = {
  children: React.ReactElement
  accessible?: boolean
  fallback: React.ReactNode
  permissionStr?: string // 按钮权限的标识
}
/**
 * ccess 组件可以很简单的实现页面内的元素的权限控制
 * @param props
 * @returns
 */
const Access: React.FC<AccessProps> = (props: AccessProps) => {
  const { accessible, fallback, permissionStr, children } = props
  const { globalStore } = useStores()
  const { useAccess } = globalStore
  const isRenderChildren = permissionStr ? useAccess.operationPermission(permissionStr) : accessible
  const renderUi = isRenderChildren ? children : fallback
  return <>{renderUi}</>
}
export default Access
