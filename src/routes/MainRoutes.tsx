import { useEffect, Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import { useAuthentication } from "../store/auth"
import { getLocalStorage } from "../utils/localStorage"
import {
  isAuthenticationDataValid,
  isUserDataValid,
  isTokenExpired,
} from "../modules/auth/auth.utils"
import useAuth from "../hooks/mocks/authHook"
import Layout from "../layout/Layout"
import PrivateRoute from "./PrivateRoute"
import Loading from "../components/Loading"

const SignUp = lazy(() => import("../pages/auth/sign-up/SignUp"))
const SignIn = lazy(() => import("../pages/auth/sign-in/SignIn"))

function MainRoutes() {
  const setUser = useAuthentication((state) => state.setUser)
  const isAuthenticated = useAuthentication((state) => state.isAuthenticated)
  const { signOutMock } = useAuth()

  useEffect(() => {
    function checkUserAuthenticationOnPageMount() {
      const authenticationValues = getLocalStorage("authentication")
      const isValuesValid = isAuthenticationDataValid(authenticationValues)
      if (!isValuesValid) return
      const tokenExpired = isTokenExpired(
        authenticationValues.timestamp,
        authenticationValues.expirationDuration
      )
      if (tokenExpired) {
        signOutMock()
        return
      }
      const userData = getLocalStorage("user")
      const userDataIsValid = isUserDataValid(userData)
      if (!userDataIsValid) return
      setUser(userData)
    }
    checkUserAuthenticationOnPageMount()
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={routes.AUTH.SIGN_UP}
          element={
            <PrivateRoute
              isAllowed={!isAuthenticated}
              redirectTo={routes.DASHBOARD}
            >
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.AUTH.SIGN_IN}
          element={
            <PrivateRoute
              isAllowed={!isAuthenticated}
              redirectTo={routes.DASHBOARD}
            >
              <SignIn />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.DASHBOARD + "*"}
          element={
            <PrivateRoute
              isAllowed={isAuthenticated}
              redirectTo={routes.AUTH.SIGN_IN}
            >
              <Layout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  )
}

export default MainRoutes
