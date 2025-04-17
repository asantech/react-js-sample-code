import React from "react"

import AuthRoutes from "./AuthRoutes"
import ComponentRoutes from "./ComponentRoutes"

function DashboardRoutes() {
  return (
    <>
      <AuthRoutes />
      <ComponentRoutes />
    </>
  )
}

export default DashboardRoutes
