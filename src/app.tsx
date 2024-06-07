import { useNavigate, useRoutes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import routerConfig from '@/router'
import { useSentry, useQianKun } from './hooks'
import { SentryConfig } from './utils/envConstans'
import { getLocalStorageItem } from './utils'
import { LOCAL_STORAGE, ROUTES } from './utils/enums'
import { useEffect } from 'react'
import { useStores } from './store'

function App() {
  const navigate = useNavigate()
  const RouterElement = useRoutes(routerConfig)
  const { globalStore } = useStores()
  useSentry(SentryConfig.dns as string, false)
  useQianKun()
  // 检测用户是否登陆，没有登陆就直接跳转到登陆页面
  const checkAuth = async () => {
    // 获取 ACCESS_TOKEN
    const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN) || undefined
    // 判断是否登录，没有登录跳转到登录页
    if (!ACCESS_TOKEN) {
      navigate(ROUTES.LOGIN)
    }
    // 如果不是登录页面，那么重新执行初始化用户信息、菜单和权限
    if (!(location.pathname === ROUTES.LOGIN)) {
      await globalStore.initUserAuthority()
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])
  console.log('app渲染了')

  return <div className="App">{RouterElement}</div>
}

export default observer(App)
