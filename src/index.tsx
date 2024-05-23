import ReactDOM from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'

// 获取你的 HTML 文件中的根 DOM 元素
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
