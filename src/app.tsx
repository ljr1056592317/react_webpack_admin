import { NavLink, useRoutes } from 'react-router-dom'
import routerConfig from '@/router'
import { SentryDns } from './utils/envConstans'
import { useSentry } from './hooks'
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
console.log(process.env, '2')

function App() {
  const RouterElement = useRoutes(routerConfig)
  useSentry(SentryDns as string)
  const throwError = () => {
    const a = { fn: 1 }
    // console.log(a.sss);
    const e = new Error()
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
