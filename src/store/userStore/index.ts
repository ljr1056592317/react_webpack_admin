import { makeAutoObservable, observable, action, computed, flow } from 'mobx'
// import {globalStore} from '../global';

class UserStore {
  constructor() {
    // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
    makeAutoObservable(this)
  }

  count = 0
  name = 'react'
  data: any = []
  loading = true

  addCount = () => {
    this.count++
  }

  setName = (data: string) => {
    this.name = data
  }
}
const userStore = new UserStore()
export default userStore
