import { Routes, Route } from 'react-router-dom'

import { routes } from './routes'
import UseRef from '@pages/libraries/react-js/UseRef'

function LibrariesRoutes() {
  return (
    <Routes>
      <Route
        path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS.USE_REF}
        element={<UseRef />}
      />
    </Routes>
  )
}

export default LibrariesRoutes
