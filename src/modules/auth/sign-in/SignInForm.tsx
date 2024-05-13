import { useState } from "react"

import CustomForm2, {
  FormValues,
} from "../../../components/common/forms/CustomForm2"
import CustomInput from "../../../components/common/inputs/CustomInput"
import CustomButton from "../../../components/common/buttons/CustomButton"
import { signInMock } from "../../../services/mocks/auth"
import { useAuthStore, type User } from "../../../store/auth"
import { signInSchema } from "./SignInForm.schema"
import { setLocalStorage, getLocalStorage } from "../../../utils/localStorage"
import { hasAuthDataTokens } from "../auth.utils"
import { type SignInMockResponse } from "../../../services/mocks/auth"

function SignInForm() {
  const setUser = useAuthStore((state) => state.setUser)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const signIn = async ({ email, password }: FormValues) => {
    setIsSigningIn(true)
    const signInFormValues = {
      email: email.trim(),
      password: password.trim(),
    }
    const response = (await signInMock(signInFormValues)) as SignInMockResponse

    if (!response) {
      setIsSigningIn(false)
      return
    }

    const isSignInResponseValid = hasAuthDataTokens(response.auth)

    if (!isSignInResponseValid) {
      setIsSigningIn(false)
      return
    }

    setLocalStorage("auth", response.auth)
    setLocalStorage("user", response.user)
    setUser(getLocalStorage("user") as User)
    setIsSigningIn(false)
    // redirect here to dashboard
  }

  return (
    <CustomForm2 schema={signInSchema} onSubmit={signIn}>
      <CustomInput label="Email" name="email" placeholder="Email" />
      <CustomInput label="Password" name="password" placeholder="Password" />
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
