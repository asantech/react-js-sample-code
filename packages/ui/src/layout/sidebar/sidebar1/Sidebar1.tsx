import React from "react"
import clsx from "clsx"

import MenuGroup1 from "./components/MenuGroup1"
import logo from "../../../assets/logo.png"
import {
  SidebarMenuItemType,
  SidebarMenuGroupType,
  SIDEBAR_CONFIG,
} from "./Sidebar1.config"

type SidebarProps = {
  expanded: boolean
}

function Sidebar({ expanded }: Readonly<SidebarProps>) {
  return (
    <aside className="h-screen bg-sky-400 __app__layout__sidebar">
      <div
        className={clsx(
          "flex justify-start items-center gap-5 py-5 mb-12",
          expanded ? "px-8" : "px-4"
        )}
      >
        <img
          src={logo}
          alt="App Logo"
          className="w-16"
          style={{ borderRadius: "50%" }}
        />
        {expanded && (
          <span className="text-white text-xl font-semibold">
            React Sample App
          </span>
        )}
      </div>
      <div
        className={clsx(
          "pb-8 overflow-x-hidden overflow-y-auto",
          expanded ? "px-8" : "px-4"
        )}
        style={{ height: "calc(100vh - 152px)", direction: "rtl" }}
      >
        {SIDEBAR_CONFIG.map(
          (
            config: SidebarMenuItemType | SidebarMenuGroupType,
            index: number
          ) => {
            const key = index
            return (
              <MenuGroup1
                key={key}
                config={config}
                nestedLevel={1}
                accumulatedLinkPath={config.linkPath}
                minified={!expanded}
              />
            )
          }
        )}
      </div>
    </aside>
  )
}

export default Sidebar
