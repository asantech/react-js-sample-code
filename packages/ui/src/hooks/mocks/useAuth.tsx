import { useNavigate } from "react-router-dom"

import { routes } from "../../routes/routes"
import { removeFromLocalStorage } from "../../utils/localStorage"
import { useAuthStore } from "../../store/auth"

const useAuth = () => {
  const navigate = useNavigate()
  const removeUser = useAuthStore((state) => state.removeUser)

  const signOutMock = () => {
    removeFromLocalStorage("auth")
    removeFromLocalStorage("user")
    removeUser()
    navigate(routes.AUTH.SIGN_IN)
  }

  return {
    signOutMock,
  }
}

export default useAuth
