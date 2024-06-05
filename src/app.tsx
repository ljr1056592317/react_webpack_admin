import { useRoutes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import routerConfig from '@/router'
import { useSentry, useQianKun } from './hooks'
import { SentryConfig } from './utils/envConstans'

function App() {
  const RouterElement = useRoutes(routerConfig)
  useSentry(SentryConfig.dns as string, false)
  useQianKun()
  return <div className="App">{RouterElement}</div>
}

export default observer(App)
