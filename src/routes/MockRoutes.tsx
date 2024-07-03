import { Routes, Route } from "react-router-dom"

import AirBnb from "@pages/mocks/AirBnb"
import { routes } from "./routes"

function MockRoutes() {
  return (
    <Routes>
      <Route path={routes.MOCKS.AIR_BNB} element={<AirBnb />} />
    </Routes>
  )
}

export default MockRoutes
