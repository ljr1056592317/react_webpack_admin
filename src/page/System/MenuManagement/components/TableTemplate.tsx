import { type ActionType, ProTable, type ProColumns } from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { useRef, type FC } from 'react'
import type { SearchParams } from '@/utils/types/system/menu-management'
import { formatResponse, randomTagColor } from '@/utils'
import { getMenuList } from '@/services/system/menu-management'
import { ROUTES } from '@/utils/enums'
import { Space, Tag } from 'antd'

/**
 * @description: 默认不显示的 column 项
 * @author: admin丶
 */
const MENU_CFG = [
  'redirect',
  'hideChildrenInMenu',
  'hideInMenu',
  'hideInBreadcrumb',
  'headerRender',
  'footerRender',
  'menuRender',
  'menuHeaderRender',
  'flatMenu',
  'fixedHeader',
  'fixSiderbar',
]

const TableTemplate: FC = () => {
  // 获取表格实例
  const tableRef = useRef<ActionType>()
  /**
   * @description: 获取菜单列表
   * @author: admin丶
   */
  const { data: menuTree, runAsync: fetchMenuList } = useRequest(
    async (params) => formatResponse(await getMenuList(params)),
    {
      manual: true,
    },
  )
  const columns: ProColumns<API.MENUMANAGEMENT>[] = [
    /* 菜单名称 */
    {
      title: '菜单名称',
      dataIndex: 'zh-CN',
      ellipsis: true,
      hideInSearch: true,
      fixed: 'left',
      render: (_, record) => {
        console.log(record, 'record')

        return record.redirect ? (
          <Tag>{1111}</Tag>
        ) : (
          <Space>{record.icon ? <Tag>{record['zh-CN']}</Tag> : <Tag>{record['zh-CN']}</Tag>}</Space>
        )
      },
    },
    /* 菜单类型 */
    {
      title: '菜单类型',
      dataIndex: 'menu_type',
      width: 120,
      align: 'center',
      filters: true,
      onFilter: true,
      // valueEnum: mapValues(MenuTypeEnum, (item: string) =>
      // 	formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${item}`) })),
      render: (_, record) => (
        <Tag color={randomTagColor()}>
          1111
          {/* {formatMessage({
						id:
							formatPerfix(ROUTES.MENUMANAGEMENT, `menu_type.${MenuTypeEnum[record.menu_type]}`),
					})} */}
        </Tag>
      ),
    },
    /* 路由地址 */
    {
      title: '路由地址',
      dataIndex: 'path',
      width: 120,
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    /* 重定向 */
    {
      title: '重定向',
      dataIndex: 'redirect',
      ellipsis: true,
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    /* 组件路径 */
    {
      title: '组件路径',
      dataIndex: 'component',
      width: 120,
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    /* 权限标识 */
    {
      title: '权限标识',
      dataIndex: 'permission',
      ellipsis: true,
      // tip: formatMessage({ id: formatPerfix(ROUTES.MENUMANAGEMENT, 'permission.tooltip') }),
      hideInSearch: true,
      width: 250,
      align: 'center',
      render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
    },
  ]
  return (
    <>
      <ProTable<API.MENUMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams) => await fetchMenuList(params)}
        rowKey="menu_id"
        pagination={false}
        // columnsState={{
        // 	value: columnsStateMap,
        // 	onChange: setColumnsStateMap,
        // }}
        // scroll={{ x: columnScrollX(columns) }}
      />
    </>
  )
}
export default TableTemplate
