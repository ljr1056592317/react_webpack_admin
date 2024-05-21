import Header from '@/components/header'
import Log from '@/assets/lockScreen.jpg'
function App() {
  return (
    <div className="App">
      <Header />
      <div>React18 + Ts5 + webpack5 开发模板搭建</div>
      <img src={Log} alt="图片资源" />
    </div>
  )
}

export default App
