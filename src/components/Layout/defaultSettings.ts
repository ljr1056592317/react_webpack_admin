import { type Settings as LayoutSettings } from '@ant-design/pro-components'

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Xmw Admin',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '/favicon.ico',
}

export default Settings
