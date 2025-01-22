import { useState, PropsWithChildren } from 'react'
import has from 'lodash/has'
import clsx from 'clsx'

import MenuItem1 from './MenuItem1'
import { SidebarMenuGroupType, SidebarMenuItemType } from '../Sidebar1.config'
import { HIGHEST_BG_COLOR_LEVEL, THEME_COLORS } from './MenuGroup1.utils'
import ArrowIcon1 from '@components/common/icons/ArrowIcon1'

type MenuGroup1Props = {
  className?: string
  nestedLevel?: number
  config: SidebarMenuItemType | SidebarMenuGroupType
  accumulatedLinkPath: string
  minified: boolean
}

function MenuGroup1({
  config,
  nestedLevel = 1,
  className,
  accumulatedLinkPath,
  minified
}: Readonly<PropsWithChildren<MenuGroup1Props>>) {
  const [collapsed, setCollapsed] = useState(true)

  const hasMenu = has(config, 'menu')
  const label = config.label
  const colorLevel = HIGHEST_BG_COLOR_LEVEL - nestedLevel + 1
  const labelIndentation = minified ? 8 : 16

  const toggleCollapse = () => {
    setCollapsed(collapsedState => !collapsedState)
  }

  const menuItemClassName = clsx(
    'py-2 text-white mb-1 rounded-lg',
    THEME_COLORS[colorLevel],
    nestedLevel === 1 && 'mb-1 font-medium'
  )

  if (!hasMenu)
    return (
      <MenuItem1
        className={menuItemClassName}
        label={label}
        linkPath={accumulatedLinkPath}
        labelIndentation={labelIndentation}
        nestedLevel={nestedLevel}
      />
    )
  return (
    <div
      className={clsx(nestedLevel === 1 && 'mb-1')}
      style={{ direction: 'ltr' }}
    >
      <button
        className={clsx(
          `flex justify-between items-center w-full py-2 rounded-lg mb-1 outline-none`,
          THEME_COLORS[colorLevel],
          nestedLevel === 1 && 'font-medium',
          className
        )}
        style={{
          paddingRight: labelIndentation
        }}
        onClick={toggleCollapse}
      >
        <span
          className={'text-white one-line-ellipsis'}
          style={{
            paddingLeft: `${nestedLevel * labelIndentation}px`,
            paddingRight: `${nestedLevel * labelIndentation}px`
          }}
        >
          {label}
        </span>
        <ArrowIcon1
          className={clsx('w-3 h3', !collapsed && 'rotate-180')}
          color='white'
          style={{ fill: 'white' }}
        />
      </button>
      {!collapsed && (
        <div className=''>
          {config.menu.map((conf: MenuGroup1Props['config'], index: number) => {
            const key = index
            return (
              <MenuGroup1
                key={key}
                config={conf}
                nestedLevel={nestedLevel + 1}
                accumulatedLinkPath={accumulatedLinkPath + conf.linkPath}
                minified={minified}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MenuGroup1
