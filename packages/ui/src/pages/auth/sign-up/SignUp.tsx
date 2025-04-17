import { Link } from "react-router-dom"

import SignUpForm from "../../../modules/auth/sign-up/SignUpForm"
import { routes } from "../../../routes/routes"
import AuthPageWrapper from "../AuthPageWrapper"

function SignIn() {
  return (
    <AuthPageWrapper>
      <div className="max-w-96 mx-auto">
        <h1 className="mb-5 text-center font-bold text-lg">Sign Up</h1>
        <div className="mb-5">
          <SignUpForm />
        </div>
        <div className="text-center">
          <Link className="align-center text-blue-400" to={routes.AUTH.SIGN_IN}>
            Sign In
          </Link>
        </div>
      </div>
    </AuthPageWrapper>
  )
}

export default SignIn
