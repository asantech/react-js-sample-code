import { Routes, Route } from "react-router-dom"

import OAuth from "@pages/auth/oauth/OAuth"

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="tokens" element={<OAuth />} />
    </Routes>
  )
}

export default DashboardRoutes
