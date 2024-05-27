import { useRoutes } from 'react-router-dom'
import routerConfig from '@/router'
import { SentryConfig } from './utils/envConstans'
import { useSentry } from './hooks'
import { observer } from 'mobx-react-lite'

function App() {
  const RouterElement = useRoutes(routerConfig)
  useSentry(SentryConfig.dns as string, false)
  return <div className="App">{RouterElement}</div>
}

export default observer(App)
