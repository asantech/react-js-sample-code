import { Routes, Route } from 'react-router-dom'

import { routes } from './routes'
import UseRef from '@pages/libraries/react-js/useRef/UseRef'
import UseCallback from '@pages/libraries/react-js/useCallback/UseCallback'
import UseDebugged from '@pages/libraries/react-js/useDebugged/UseDebugged'
import UseDefferedValue from '@pages/libraries/react-js/useDefferedValue/UseDefferedValue'

function LibrariesRoutes() {
  return (
    <Routes>
      <Route
        path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS.USE_REF}
        element={<UseRef />}
      />
      <Route
        path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS.USE_CALLBACK}
        element={<UseCallback />}
      />
      <Route
        path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS.USE_DEBUGGED_VALUE}
        element={<UseDebugged />}
      />
      <Route
        path={routes.LIBRARIES.REACT_JS.BUILT_IN_HOOKS.USE_DEFERRED_VALUE}
        element={<UseDefferedValue />}
      />
    </Routes>
  )
}

export default LibrariesRoutes
