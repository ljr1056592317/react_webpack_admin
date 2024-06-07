import { useState, type FC } from 'react'
import { Col, Row, Tabs, type TabsProps } from 'antd'
import { LoginForm } from '@ant-design/pro-components'
import { PROJECTINFO } from '@/utils/envConstans'
import logo from '@/assets/logo.svg'
import type { LoginParams, LoginType } from '@/utils/types/login'
import { LOCAL_STORAGE, LOGIN_TYPE } from '@/utils/enums'
import Account from './components/Account'
import Mobile from './components/Mobile'
import { Login, getUserInfo, getPermissions, getRoutesMenus } from '@/services/login/login'
import { useRequest, useLocalStorageState } from 'ahooks'
import { encryptionAesPsd } from '@/utils'
import styles from './index.module.less'
import { useStores } from '@/store'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>(LOGIN_TYPE.ACCOUNT)
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_localStoreValue, setLocalStore] = useLocalStorageState(LOCAL_STORAGE.ACCESS_TOKEN)
  const { globalStore } = useStores()
  const { initUserAuthority, setnum, num } = globalStore
  console.log(setnum, 'setnum')

  const navigate = useNavigate()
  const {
    run: runLogin,
    data: loginres,
    loading: loginLoading,
  } = useRequest(Login, {
    manual: true,
    onSuccess: async ({ code, data }) => {
      if (code === 200 && data) {
        // 设置token到local
        setLocalStore(data.access_token)
        // 获取用户信息、菜单和权限
        await initUserAuthority()
        setTimeout(() => {
          navigate('/')
        }, 10)
      }
    },
  })
  console.log(loginres, 'loginres1')

  const handleSubmit = async (values: LoginParams) => {
    try {
      // 账号密码登陆
      if (loginType === LOGIN_TYPE.ACCOUNT && values.password) {
        values.password = encryptionAesPsd(values.password)
      }
      const params = { ...values, type: loginType }
      runLogin(params)
    } catch (error) {}
  }

  const TbasItems: TabsProps['items'] = [
    {
      label: '账号密码登陆',
      key: LOGIN_TYPE.ACCOUNT,
      children: <Account />,
    },
    {
      label: '手机号登陆',
      key: LOGIN_TYPE.MOBILE,
      children: <Mobile />,
    },
  ]
  return (
    <div className={styles.container}>
      <Row justify="center" className={styles.content}>
        {/* 左侧背景 */}
        <Col className={styles['login-left']}>
          <div className={styles['login-bg']} />
        </Col>
        <Col className={styles['login-form']}>
          {/* 登录表单 */}
          <LoginForm
            logo={<img alt="logo" src={logo} />}
            title={PROJECTINFO.name}
            subTitle={'技术栈: webpack5 + react18 + mobx + antd + axios'}
            submitter={{
              submitButtonProps: {
                loading: loginLoading,
              },
            }}
            onFinish={(values) => {
              handleSubmit(values as LoginParams)
            }}
          >
            <Tabs
              destroyInactiveTabPane
              centered
              activeKey={loginType}
              onChange={(activeKey) => {
                setLoginType(activeKey as LoginType)
              }}
              items={TbasItems}
            />
          </LoginForm>
        </Col>
      </Row>
      <button
        onClick={() => {
          setnum()
        }}
      >
        点我改变了-{num}
      </button>
    </div>
  )
}

export default observer(LoginPage)
