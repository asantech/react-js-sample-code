import { useState } from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"

import CustomForm, {
  FormValues,
} from "../../../components/common/forms/CustomForm"
import CustomInput from "../../../components/common/inputs/CustomInput"
import CustomButton from "../../../components/common/buttons/CustomButton"
import { signUpMock } from "../../../services/mocks/auth"
import { useAuthentication, type User } from "../../../store/auth"
import { signUpSchema } from "./SignUpForm.schema"
import { setLocalStorage, getLocalStorage } from "../../../utils/localStorage"
import { isAuthenticationDataValid } from "../../../modules/auth/auth.utils"
import { type SignInMockResponse } from "../../../services/mocks/auth"

function SignInForm() {
  const setUser = useAuthentication((state) => state.setUser)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const signUp = async ({
    email,
    firstName,
    lastName,
    password,
  }: FormValues) => {
    setIsSigningUp(true)

    const response = (await signUpMock({
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: password.trim(),
    })) as SignInMockResponse
    if (!response) {
      setIsSigningUp(false)
      return
    }

    const isSignInResponseValid = isAuthenticationDataValid(
      response.authentication
    )

    if (!isSignInResponseValid) {
      setIsSigningUp(false)
      return
    }

    setLocalStorage("authentication", response.authentication)
    setLocalStorage("user", response.user)
    setUser(getLocalStorage("user") as User)
    setIsSigningUp(false)
  }

  return (
    <CustomForm schema={signUpSchema} onSubmit={signUp}>
      {({
        register,
        errors,
      }: {
        register: UseFormRegister<FormValues>
        errors: FieldErrors
      }) => (
        <>
          <CustomInput
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message as string}
          />
          <CustomInput
            placeholder="First Name"
            {...register("firstName")}
            error={errors.firstName?.message as string}
          />
          <CustomInput
            placeholder="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message as string}
          />
          <CustomInput
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message as string}
          />
          <CustomInput
            placeholder="Password Repeat"
            {...register("passwordRepeat")}
            error={errors.passwordRepeat?.message as string}
          />
          <div className="text-center">
            <CustomButton
              type="submit"
              variant="primary"
              className="mx-auto"
              isLoading={isSigningUp}
              isDisabled={isSigningUp}
            >
              Submit
            </CustomButton>
          </div>
        </>
      )}
    </CustomForm>
  )
}

export default SignInForm
