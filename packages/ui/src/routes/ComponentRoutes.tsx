import React from "react"
import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import Dropdowns from "../pages/components/Dropdowns"

function ComponentRoutes() {
  return (
    <Routes>
      <Route path={routes.COMPONENTS.DROPDOWNS} element={<Dropdowns />} />
    </Routes>
  )
}

export default ComponentRoutes
