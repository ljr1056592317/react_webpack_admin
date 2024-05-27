/*
 * react-router-dom v6 官方文档
 * https://reactrouter.com/en/v6.3.0/getting-started/installation
 */
import { type RouteObject, Navigate } from 'react-router-dom'
import SuspenseLazy from '@/components/SuspenseLazy'
import { asyncLoadRouteCom } from '@/utils/permission'
const BaseLayout = SuspenseLazy(() => import(/* webpackChunkName:"BaseLayout" */ '@/components/Layout'))
const Home = SuspenseLazy(() => import(/* webpackChunkName:"Home" */ '@/page/Home'))
const Login = SuspenseLazy(() => import(/* webpackChunkName:"Login" */ '@/page/Login'))
const NotFound = SuspenseLazy(() => import(/* webpackChunkName:"NotFound" */ '@/page/NotFound'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/user/login" />, // 重定向
  },
  {
    path: '/user/login',
    element: Login,
  },
  // {
  //   path: '/admin',
  //   element: BaseLayout,
  //   children: [
  //     {
  //       path: '/admin',
  //       element: <Navigate to="/admin/home" />, // 重定向
  //     },
  //     {
  //       path: 'home',
  //       element: Home,
  //     },
  //   ],
  // },
  // 未匹配到页面
  {
    path: '*',
    element: NotFound,
  },
]

export default routes
