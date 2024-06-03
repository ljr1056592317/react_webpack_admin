import { useState, type FC } from 'react'
import { Col, Row, Tabs, type TabsProps } from 'antd'
import { LoginForm } from '@ant-design/pro-components'
import styles from './index.module.less'
import { PROJECTINFO } from '@/utils/envConstans'
import logo from '@/assets/logo.svg'
import type { LoginParams, LoginType } from '@/utils/types/login'
import { LOCAL_STORAGE, LOGIN_TYPE } from '@/utils/enums'
import Account from './components/Account'
import Mobile from './components/Mobile'
import { Login } from '@/services/login/login'
import { useRequest, useLocalStorageState } from 'ahooks'

const LoginPage: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>(LOGIN_TYPE.ACCOUNT)
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_localStoreValue, setLocalStore] = useLocalStorageState(LOCAL_STORAGE.ACCESS_TOKEN)

  const { run: runLogin, data: loginres } = useRequest(Login, {
    manual: true,
    onSuccess: ({ code, data }) => {
      if (code === 200 && data) {
        // 设置token到local
        setLocalStore(data.access_token)
      }
    },
  })
  console.log(loginres, 'loginres1')

  const handleSubmit = async (values: LoginParams) => {
    const params = { ...values, password: 'IqDDrMKzGqHgIOW7ya8cMQ==', type: loginType }
    runLogin(params)
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
                // loading: loginLoading,
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
    </div>
  )
}

export default LoginPage
