import { useRoutes } from 'react-router-dom'
import routerConfig from '@/router'

function App() {
  const RouterElement = useRoutes(routerConfig)
  return (
    <div className="App">
      app中
      {RouterElement}
    </div>
  )
}

export default App
