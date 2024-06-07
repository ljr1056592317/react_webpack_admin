import { type ReactNode, useState, createElement } from 'react'
import { PageContainer, ProCard, ProConfigProvider, ProLayout, SettingDrawer } from '@ant-design/pro-components'
import type { ProSettings, MenuDataItem } from '@ant-design/pro-components'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import styles from './index.less'
import { avatarProps } from './components'
import Footer from '../Footer'
import { asideMenuConfig, icons } from './menuConfig'
import { useStores } from '@/store'

const menuItemRender = (item: MenuDataItem, defaultDom: ReactNode) => {
  if (item.path == null || !item.path) {
    return defaultDom
  }
  return <Link to={item.path}>{defaultDom}</Link>
}

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
  return menus.map((item) => {
    const icon = icons[item.icon as string]
    const path = '/admin' + item.path
    return {
      ...item,
      path,
      icon: icon && (createElement(icon) as ReactNode),
      children: item.children && loopMenuItem(item.children),
    }
  })
}

const BasicLayout: React.FC = () => {
  const location = useLocation()
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: 'mix',
    contentWidth: 'Fluid', // 流式
  })
  const { globalStore } = useStores()
  const { RouteMenu } = globalStore
  return (
    <div id="base-pro-layout-div" className={styles.baseProLayoutDiv}>
      <ProConfigProvider hashed={false}>
        <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
          <ProLayout
            siderWidth={256}
            prefixCls="base-pro-layout"
            location={{
              pathname: location.pathname,
            }}
            // 头像的设置
            avatarProps={avatarProps()}
            // 左侧菜单页脚设置
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2021 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              )
            }}
            // 页面页脚的配置
            footerRender={() => <Footer />}
            // 关闭国际化，远程加载菜单的方法
            menu={{ locale: false, request: async () => RouteMenu || [] }}
            // 自定义菜单项的渲染
            menuItemRender={menuItemRender}
            // menuDataRender={() => loopMenuItem(asideMenuConfig)}
            {...settings}
          >
            <PageContainer>
              <ProCard
                style={{
                  height: '100vh',
                  minHeight: 800,
                }}
              >
                <Outlet />
              </ProCard>
            </PageContainer>
            <SettingDrawer
              enableDarkTheme
              getContainer={() => document.getElementById('base-pro-layout-div')}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting)
              }}
              disableUrlParams={true}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  )
}

export default BasicLayout
