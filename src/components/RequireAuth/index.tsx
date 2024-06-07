import { useStores } from '@/store'
import type { RequireAuthProps } from '@/utils/types'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

const RequireAuth = (props: RequireAuthProps) => {
  const { path, fallbackPath = '/user/login', children } = props
  const { globalStore } = useStores()
  const { useAccess } = globalStore
  const isAuth = useAccess.adminRouteFilter(path)
  if (!isAuth) {
    return <Navigate to={fallbackPath} replace />
  }
  return children
}

export default observer(RequireAuth)
