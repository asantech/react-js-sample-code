import { useEffect, Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import { useAuthStore } from "../store/auth"
import { getLocalStorage } from "../utils/localStorage"
import {
  hasAuthDataTokens,
  isUserDataValid,
  isTokenExpired,
} from "../modules/auth/auth.utils"
import useAuth from "../hooks/mocks/useAuth"
import Layout from "../layout/Layout"
import ProtectedRoute from "./ProtectedRoute"
import Loading from "../components/Loading"

const SignUp = lazy(() => import("../pages/auth/sign-up/SignUp"))
const SignIn = lazy(() => import("../pages/auth/sign-in/SignIn"))

function MainRoutes() {
  const setUser = useAuthStore((state) => state.setUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { signOutMock } = useAuth()

  useEffect(() => {
    function checkUserAuthOnPageMount() {
      const authValues = getLocalStorage("auth")
      const isValuesValid = hasAuthDataTokens(authValues)
      if (!isValuesValid) return
      const isRefreshTokenExpired = isTokenExpired(authValues.refreshToken)
      if (isRefreshTokenExpired) {
        signOutMock()
        return
      }
      const userData = getLocalStorage("user")
      const userDataIsValid = isUserDataValid(userData)
      if (!userDataIsValid) return
      setUser({ user: userData, auth: authValues })
    }
    checkUserAuthOnPageMount()
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={routes.AUTH.SIGN_UP}
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated} // isNotAllowed
              redirectTo={routes.DASHBOARD}
            >
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.AUTH.SIGN_IN}
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectTo={routes.DASHBOARD}
            >
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.DASHBOARD + "*"}
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              redirectTo={routes.AUTH.SIGN_IN}
            >
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  )
}

export default MainRoutes
