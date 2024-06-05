import { registerMicroApps, start } from 'qiankun'
import { useEffect } from 'react'

const useQianKun = () => {
  useEffect(() => {
    registerMicroApps([
      {
        name: 'app-vue3', // 子应用名称，跟package.json一致
        entry: '//localhost:7001', // 子应用入口，本地环境下指定端口
        container: '#root', // 挂载子应用的dom
        activeRule: '/app/app-vue3', // 路由匹配规则
        props: {
          age: 18888,
          msg: '传递点信息',
        }, // 主应用与子应用通信传值
      },
    ])
    start()
  }, [])
}

export default useQianKun
