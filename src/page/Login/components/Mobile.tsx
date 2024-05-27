/*
 * @Description: 手机号码登录
 * @Version: 2.0
 * @Author: admin丶
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: admin丶
 * @LastEditTime: 2023-09-22 14:51:03
 */
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components'
import { App } from 'antd'
import type { FC } from 'react'

const Mobile: FC = () => {
  // hooks 调用
  const { message } = App.useApp()
  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined className={'prefixIcon'} />,
        }}
        name="mobile"
        placeholder={'手机号'}
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        captchaProps={{
          size: 'large',
        }}
        placeholder={'请输入验证码'}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${'获取验证码'}`
          }
          return '获取验证码'
        }}
        name="captcha"
        rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        onGetCaptcha={async () => {
          message.success('获取验证码成功！验证码为：1234')
        }}
      />
    </>
  )
}
export default Mobile
