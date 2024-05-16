import { useState } from "react"
import { UseFormRegister, FieldErrors, Controller } from "react-hook-form"

import CustomForm1, { FormValues } from "@components/common/forms/CustomForm1"
import CustomInput from "@components/common/inputs/CustomInput"
import CustomButton from "@components/common/buttons/CustomButton"
import { signUpMock } from "@services/mocks/auth"
import { useAuthStore, type User } from "@store/auth"
import { signUpSchema } from "./SignUpForm.schema"
import { setLocalStorage, getLocalStorage } from "@utils/localStorage"
import { hasAuthDataTokens } from "@modules/auth/auth.utils"
import { type SignInMockResponse } from "@services/mocks/auth"
import Dropdown1 from "@components/common/dropdowns/Dropdown1"
import { GENDER_OPTIONS } from "./SignUpForm.utils"

function SignInForm() {
  const setUser = useAuthStore((state) => state.setUser)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const signUp = async ({
    email,
    firstName,
    lastName,
    gender,
    password,
  }: FormValues) => {
    setIsSigningUp(true)

    const signUpFormValues = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      password: password.trim(),
    }

    const response = (await signUpMock(signUpFormValues)) as SignInMockResponse
    if (!response) {
      setIsSigningUp(false)
      return
    }

    const isSignInResponseValid = hasAuthDataTokens(response.auth)

    if (!isSignInResponseValid) {
      setIsSigningUp(false)
      return
    }

    setLocalStorage("auth", response.auth)
    setLocalStorage("user", response.user)
    setUser(getLocalStorage("user") as User)
    setIsSigningUp(false)
  }

  return (
    <CustomForm1 schema={signUpSchema} onSubmit={signUp}>
      {({
        register,
        errors,
        control,
      }: {
        register: UseFormRegister<FormValues>
        errors: FieldErrors
        control: any
      }) => (
        <>
          <CustomInput
            placeholder="Email"
            {...register("email")}
            errorMessage={errors.email?.message as string}
          />
          <CustomInput
            placeholder="First Name"
            {...register("firstName")}
            errorMessage={errors.firstName?.message as string}
          />
          <CustomInput
            placeholder="Last Name"
            {...register("lastName")}
            errorMessage={errors.lastName?.message as string}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Dropdown1
                className="mb-5"
                placeholder="Gender"
                options={GENDER_OPTIONS}
                errorMessage={errors.gender?.message as string}
                {...field}
              />
            )}
          />
          <CustomInput
            placeholder="Password"
            {...register("password")}
            errorMessage={errors.password?.message as string}
          />
          <CustomInput
            placeholder="Password Repeat"
            {...register("passwordRepeat")}
            errorMessage={errors.passwordRepeat?.message as string}
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
    </CustomForm1>
  )
}

export default SignInForm
