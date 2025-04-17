import React from "react"
import { Link } from "react-router-dom"

import SignInForm from "../../../modules/auth/sign-in/SignInForm"
import { routes } from "../../../routes/routes"
import AuthPageWrapper from "../AuthPageWrapper"
import { AUTH_FLOW_OPTIONS } from "./SignIn.utils"
import Dropdown2 from "../../../components/common/dropdowns/Dropdown2"

function SignIn() {
  return (
    <AuthPageWrapper>
      <div className="max-w-96 mx-auto">
        <Dropdown2
          className="mb-10"
          placeholder="auth flow"
          option={AUTH_FLOW_OPTIONS[0]}
          options={AUTH_FLOW_OPTIONS}
        />
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
