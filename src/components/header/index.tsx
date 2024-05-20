import styles from './index.module.less'
const testFn = (a: number, b: number) => {
  return a + b
}
testFn(1, 2)
const Header = () => {
  return <div className={styles.header}>我的头部</div>
}

export default Header
