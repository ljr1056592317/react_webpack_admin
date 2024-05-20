import styles from './index.module.less'
import { useState } from 'react'
const testFn = (a: number, b: number) => {
  return a + b
}
// testFn(1, 2)
const Header = () => {
  const a: number = 100
  // a = '11'
  return <div className={styles.header}>我的头部12201222222222222222222{a}</div>
}

export default Header
