import { Dropdown, type MenuProps } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { type HeaderProps } from '@ant-design/pro-components'
import { defaultAvatarSrc } from '@/utils/constans'
export default function AvatarProps(): HeaderProps['avatarProps'] {
  const onMenuClick = () => {}
  const menuItems: MenuProps['items'] = []
  return {
    src: defaultAvatarSrc,
    size: 'small',
    title: '管理人员',
    render: (_, dom) => {
      return (
        <Dropdown
          // menu={{ onClick: onMenuClick, items: menuItems }}
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
              },
            ],
          }}
        >
          {dom}
        </Dropdown>
      )
    },
  }
}
// const AvatarProps: HeaderProps['avatarProps'] = (openLockScreen: () => void) => {
//     return {
//         src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
//         size: 'small',
//         title: '管理人员',
//         render: (_props: any, dom: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => {
//             return (
//                 <Dropdown
//                     menu={{
//                         items: [
//                             {
//                                 key: 'logout',
//                                 icon: <LogoutOutlined />,
//                                 label: '退出登录',
//                             },
//                         ],
//                     }}
//                 >
//                     {dom}
//                 </Dropdown>
//             );
//         },
//     }
// }
