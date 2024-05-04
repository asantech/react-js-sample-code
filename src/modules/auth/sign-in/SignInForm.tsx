import { useState } from "react"

import CustomForm2, {
  FormValues,
} from "../../../components/common/forms/CustomForm2"
import CustomInput from "../../../components/common/inputs/CustomInput"
import CustomButton from "../../../components/common/buttons/CustomButton"
import { signInMock } from "../../../services/mocks/auth"
import { useAuthentication, type User } from "../../../store/auth"
import { signInSchema } from "./SignInForm.schema"
import { setLocalStorage, getLocalStorage } from "../../../utils/localStorage"
import { isAuthenticationDataValid } from "../auth.utils"
import { type SignInMockResponse } from "../../../services/mocks/auth"

function SignInForm() {
  const setUser = useAuthentication((state) => state.setUser)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const signIn = async ({ email, password }: FormValues) => {
    setIsSigningIn(true)
    const response = (await signInMock({
      email: email.trim(),
      password: password.trim(),
    })) as SignInMockResponse
    if (!response) {
      setIsSigningIn(false)
      return
    }

    const isSignInResponseValid = isAuthenticationDataValid(
      response.authentication
    )

    if (!isSignInResponseValid) {
      setIsSigningIn(false)
      return
    }

    setLocalStorage("authentication", response.authentication)
    setLocalStorage("user", response.user)
    setUser(getLocalStorage("user") as User)
    setIsSigningIn(false)
  }

  return (
    <CustomForm2 schema={signInSchema} onSubmit={signIn}>
      <CustomInput name="email" placeholder="Email" />
      <CustomInput name="password" placeholder="Password" />
      <div className="text-center">
        <CustomButton
          type="submit"
          variant="primary"
          isLoading={isSigningIn}
          isDisabled={isSigningIn}
        >
          Submit
        </CustomButton>
      </div>
    </CustomForm2>
  )
}

export default SignInForm
