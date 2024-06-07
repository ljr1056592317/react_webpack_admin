import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="您貌似走丢了.."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate('/')
          }}
        >
          回到主页
        </Button>
      }
    />
  )
}

export default NoFoundPage
