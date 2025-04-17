import React from "react"
import { Routes, Route } from "react-router-dom"

import OAuth from "../pages/auth/oauth/OAuth"
import { routes } from "./routes"

function AuthRoutes() {
  return (
    <Routes>
      <Route path={routes.AUTH.OAUTH} element={<OAuth />} />
    </Routes>
  )
}

export default AuthRoutes
