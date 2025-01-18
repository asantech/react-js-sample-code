import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import BuiltInHooks from "@pages/libraries/react-js/BuiltInHooks"

function LibrariesRoutes() {
  return (
    <Routes>
      <Route path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS} element={<BuiltInHooks />} />
    </Routes>
  )
}

export default LibrariesRoutes
