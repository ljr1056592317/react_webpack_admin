/*
 * react-router-dom v6 官方文档
 * https://reactrouter.com/en/v6.3.0/getting-started/installation
 */
import { Navigate, type RouteObject } from 'react-router-dom'
// import About from '@/page/About'
// import Home from '@/page/Home'
// import NotFound from '@/page/NotFound'
import SuspenseLazy from '@/components/SuspenseLazy'
const Home = SuspenseLazy(() => import(/* webpackChunkName:"Home" */ '@/page/Home'))
const About = SuspenseLazy(() => import(/* webpackChunkName:"About" */ '@/page/About'))
const NotFound = SuspenseLazy(() => import(/* webpackChunkName:"NotFound" */ '@/page/NotFound'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="home" />, // 重定向
  },
  {
    path: 'home',
    element: Home,
  },
  {
    path: 'about',
    element: About,
  },
  // 未匹配到页面
  {
    path: '*',
    element: NotFound,
  },
]

export default routes
