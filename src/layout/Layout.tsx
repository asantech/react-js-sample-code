import { useState } from "react"
import clsx from "clsx"

import Header from "@layout/header/Header"
import Navbar from "@layout/navbar/Navbar"
import Sidebar1 from "@layout/sidebar/sidebar1/Sidebar1"
import Main from "@layout/main/Main"
import Footer from "@layout/footer/Footer"
import SidebarToggleButton from "@components/layout/buttons/SidebarToggleButton"

function Layout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const toggleExpandState = () => {
    setSidebarExpanded((sidebarExpandedState) => !sidebarExpandedState)
  }

  return (
    <div className="flex">
      <div className={clsx(sidebarExpanded ? "w-1/5" : "w-1/12")}>
        <Sidebar1 expanded={sidebarExpanded} />
      </div>
      <div
        className={clsx(sidebarExpanded ? "w-4/5" : "w-11/12", "flex flex-col")}
      >
        <Header>
          <SidebarToggleButton toggleExpandState={toggleExpandState} />
        </Header>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
