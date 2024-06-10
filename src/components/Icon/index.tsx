import React from 'react'
import * as Icons from '@ant-design/icons'
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon'

const Icon = (props) => {
  const IconComponent: React.ForwardRefExoticComponent<
    Omit<IconComponentProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  > = Icons[props.name]
  return <IconComponent {...props} />
}
export default Icon
