import { Link } from "react-router-dom"

import SignInForm from "../../../modules/auth/sign-in/SignInForm"
import { routes } from "../../../routes/routes"
import AuthPageWrapper from "../AuthPageWrapper"

function SignIn() {
  return (
    <AuthPageWrapper>
      <div className="max-w-96 mx-auto">
        <h1 className="mb-5 text-center font-bold text-lg">Sign In</h1>
        <div className="mb-5">
          <SignInForm />
        </div>
        <div className="text-center">
          <Link className="align-center text-blue-400" to={routes.AUTH.SIGN_UP}>
            Sign Up
          </Link>
        </div>
      </div>
    </AuthPageWrapper>
  )
}

export default SignIn
