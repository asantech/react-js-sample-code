import { useState } from "react"
import clsx from "clsx"

import Header from "./header/Header"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import Main from "./main/Main"
import Footer from "./footer/Footer"
import SidebarToggleButton from "../components/layout/buttons/SidebarToggleButton"

function Layout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const toggleExpandState = () => {
    setSidebarExpanded((sidebarExpandedState) => !sidebarExpandedState)
  }

  return (
    <div className="flex">
      <div className={clsx(sidebarExpanded ? "w-1/5" : "w-1/12")}>
        <Sidebar />
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
