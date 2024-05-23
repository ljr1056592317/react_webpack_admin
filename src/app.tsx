import { NavLink, useRoutes } from 'react-router-dom'
import routerConfig from '@/router'

function App() {
  const RouterElement = useRoutes(routerConfig)
  return (
    <div className="App">
      <div>
        <NavLink to="home">Home</NavLink>
        <br />
        <NavLink to="about">about</NavLink>
      </div>
      {RouterElement}
    </div>
  )
}

export default App
