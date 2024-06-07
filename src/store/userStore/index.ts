import { makeAutoObservable } from 'mobx'

class UserStore {
  constructor() {
    // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
    makeAutoObservable(this)
  }

  // 当前的用户信息
  CurrentUser = {}
}
const userStore = new UserStore()
export default userStore
