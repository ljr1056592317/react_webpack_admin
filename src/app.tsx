import { NavLink, useRoutes } from 'react-router-dom'
import routerConfig from '@/router'
import { SentryConfig } from './utils/envConstans'
import { useSentry } from './hooks'

function App() {
  const RouterElement = useRoutes(routerConfig)
  useSentry(SentryConfig.dns as string)
  const throwError = () => {
    // const a = { fn: 1 }
    // // console.log(a.sss);
    // const e = new Error()
    throwError()
  }
  return (
    <div className="App">
      <div>
        <NavLink to="home">Home</NavLink>
        <br />
        <NavLink to="about">about</NavLink>
      </div>
      <div>
        <button onClick={throwError}>点我报错误</button>
      </div>
      {RouterElement}
    </div>
  )
}

export default App
