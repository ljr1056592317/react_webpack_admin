/*
 * react-router-dom v6 官方文档
 * https://reactrouter.com/en/v6.3.0/getting-started/installation
 */
import { type RouteObject, Navigate } from 'react-router-dom'
import SuspenseLazy from '@/components/SuspenseLazy'
import { asyncLoadRouteCom } from '@/utils/permission'
import RequireAuth from '@/components/RequireAuth'
const BaseLayout = SuspenseLazy(() => import(/* webpackChunkName:"BaseLayout" */ '@/components/Layout'))
const Home = SuspenseLazy(() => import(/* webpackChunkName:"Home" */ '@/page/Home'))
const Login = SuspenseLazy(() => import(/* webpackChunkName:"Login" */ '@/page/Login'))
const NotFound = SuspenseLazy(() => import(/* webpackChunkName:"NotFound" */ '@/page/NotFound'))
const MenuManagement = SuspenseLazy(
  () => import(/* webpackChunkName:"MenuManagement" */ '@/page/System/MenuManagement'),
)
const UserManagement = SuspenseLazy(
  () => import(/* webpackChunkName:"MenuManagement" */ '@/page/System/UserManagement'),
)

const routes: RouteObject[] = [
  {
    path: '/user/login',
    element: Login,
  },
  {
    path: '/',
    element: BaseLayout,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />, // 重定向
      },
      {
        path: '/dashboard',
        element: <RequireAuth path={'/dashboard'}>{Home}</RequireAuth>,
      },
      {
        path: '/system',
        children: [
          {
            path: '/system',
            element: <Navigate to="/system/user-management" />,
          },
          // 用户管理
          {
            path: '/system/user-management',
            element: <RequireAuth path="/system/user-management">{UserManagement}</RequireAuth>,
          },
          {
            path: '/system/menu-management',
            element: <RequireAuth path="/system/user-management">{MenuManagement}</RequireAuth>,
          },
        ],
      },
    ],
  },
  // 未匹配到页面
  {
    path: '*',
    element: NotFound,
  },
]

export default routes
