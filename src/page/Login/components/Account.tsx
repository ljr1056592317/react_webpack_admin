/*
 * @Description: 账户密码登录
 * @Version: 2.0
 * @Author: admin丶
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: admin丶
 * @LastEditTime: 2023-09-01 14:04:49
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
// import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Col, Form, Input, Row, Spin } from 'antd'
import { get } from 'lodash-es'
import type { FC } from 'react'

import { getCaptcha } from '@/services/login/login' // 获取图形验证码
// import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'

const Account: FC = () => {
  // const { formatMessage } = useIntl();
  // // 获取图形验证码
  const { loading, run: getVerifyCode, data: verifyCode } = useRequest(async () => get(await getCaptcha(), 'data'))
  return (
    <>
      <ProFormText
        name="user_name"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'用户名: admin or user'}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
        initialValue={'admin'}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
          visibilityToggle: false,
        }}
        placeholder={'密码: ant.design'}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
        initialValue="abc123456"
      />
      <Form.Item>
        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              name="verifyCode"
              noStyle
              rules={[
                {
                  required: true,
                  message: '错误',
                },
              ]}
            >
              <Input size="large" placeholder={'请输入'} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Spin spinning={loading}>
              <div
                dangerouslySetInnerHTML={{ __html: verifyCode || '' }}
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => {
                  getVerifyCode()
                }}
              />
            </Spin>
          </Col>
        </Row>
      </Form.Item>
    </>
  )
}
export default Account
