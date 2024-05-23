import Log from '@/assets/lockScreen.jpg'
import styles from './index.less'
const Index = () => {
  return (
    <div className={styles.about}>
      我是关于页面
      <img src={Log} />
    </div>
  )
}

export default Index
