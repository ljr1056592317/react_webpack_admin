import type { MenuTypes } from '@/utils/types/system/menu-management'
import { MENU_TYPE } from '@/utils/enums'
const defaultAvatarSrc = 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'

export const MenuTypeEnum: Record<MenuTypes, string> = {
  [MENU_TYPE.DIR]: '目录',
  [MENU_TYPE.MENU]: '菜单',
  [MENU_TYPE.BUTTON]: '按钮',
}
export { defaultAvatarSrc }
