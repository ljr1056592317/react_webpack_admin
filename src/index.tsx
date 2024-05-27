import ReactDOM from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { StoresProvider, stores } from './store'
import './global.less'
// 获取你的 HTML 文件中的根 DOM 元素
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
  <BrowserRouter>
    <StoresProvider value={stores}>
      <App />
    </StoresProvider>
  </BrowserRouter>,
)
