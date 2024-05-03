import { useNavigate } from "react-router-dom"

import { routes } from "../../routes/routes"
import { removeFromLocalStorage } from "../../utils/localStorage"
import { useAuthentication } from "../../store/auth"

const useAuth = () => {
  const navigate = useNavigate()
  const removeUser = useAuthentication((state) => state.removeUser)

  const signOutMock = () => {
    removeFromLocalStorage("authentication")
    removeFromLocalStorage("user")
    removeUser()
    navigate(routes.AUTH.SIGN_IN)
  }

  return {
    signOutMock,
  }
}

export default useAuth
