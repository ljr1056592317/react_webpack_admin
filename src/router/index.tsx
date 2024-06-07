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
    ],
  },
  // 未匹配到页面
  {
    path: '*',
    element: NotFound,
  },
]

export default routes
