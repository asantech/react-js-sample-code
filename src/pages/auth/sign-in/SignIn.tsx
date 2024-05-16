import { Link } from "react-router-dom"

import SignInForm from "@modules/auth/sign-in/SignInForm"
import { routes } from "@routes/routes"
import AuthPageWrapper from "../AuthPageWrapper"
import Dropdown1 from "@components/common/dropdowns/Dropdown1"

const authFlowOptions = [
  {
    value: "1",
    label: "OAuth flow #1",
    data: { description: "mock - localStorage - refresh token not renewed" },
  },
  {
    value: "2",
    label: "OAuth flow #2",
    data: { description: "mock - cookie - refresh token not renewed" },
  },
]

function SignIn() {
  return (
    <AuthPageWrapper>
      <div className="max-w-96 mx-auto">
        <div className="mb-10">
          <Dropdown1
            placeholder="auth flow"
            option={authFlowOptions[0]}
            options={authFlowOptions}
          />
        </div>
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
