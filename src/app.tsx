import { useRoutes } from 'react-router-dom'
import routerConfig from '@/router'
import { SentryConfig } from './utils/envConstans'
import { useSentry } from './hooks'

function App() {
  const RouterElement = useRoutes(routerConfig)
  useSentry(SentryConfig.dns as string, false)
  return (
    <div className="App">{RouterElement}</div>
    // <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
    //   <div className="App">
    //     <div>
    //       <NavLink to="home">Home</NavLink>
    //       <br />
    //       <NavLink to="about">about</NavLink>
    //     </div>
    //     <div>
    //       {/* <button onClick={throwError}>点我报错误</button> */}
    //       <Button type='primary'>antd按钮</Button>
    //     </div>
    //     {RouterElement}
    //   </div>
    // </ConfigProvider>
  )
}

export default App
