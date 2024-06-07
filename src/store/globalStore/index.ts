import { makeAutoObservable, runInAction } from 'mobx'
import { get } from 'lodash-es'
import { getUserInfo, getPermissions, getRoutesMenus } from '@/services/login/login'
import access from '@/access'
class Global {
  constructor() {
    // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
    makeAutoObservable(this)
  }

  // 当前的用户信息
  CurrentUser = {}
  // 菜单信息
  RouteMenu = []
  // 权限信息
  Permissions = []

  /**
   * @description: 获取用户信息、菜单和权限
   * @author: admin丶
   */
  initUserAuthority = async () => {
    try {
      // 获取用户信息和菜单按钮权限
      const [userInfo, routeMenuInfo, permissionInfo] = await Promise.all([
        getUserInfo(),
        getRoutesMenus(),
        getPermissions(),
      ])
      console.log(userInfo, routeMenuInfo, permissionInfo, 'userInfo, routeMenuInfo, permissionInfo')

      // 在 MobX 中，不管是同步还是异步操作，都可以放到 action 中，
      // 只是异步操作在修改属性时，需要将赋值操作放到 runInAction 中。
      runInAction(() => {
        this.CurrentUser = get(userInfo, 'data', {})
        this.RouteMenu = get(routeMenuInfo, 'data', [])
        this.Permissions = get(permissionInfo, 'data', [])
      })
    } catch (error) {
      // 如果有失败就做跳转等
      console.log(error, 'error')
      // history.push(ROUTES.LOGIN);
    }
  }

  get useAccess() {
    return access({ RouteMenu: this.RouteMenu })
  }
}

const globalStore = new Global()
export default globalStore
