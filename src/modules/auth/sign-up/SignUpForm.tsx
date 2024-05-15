import { useState } from "react"
import { UseFormRegister, FieldErrors, Controller } from "react-hook-form"

import CustomForm1, {
  FormValues,
} from "../../../components/common/forms/CustomForm1"
import CustomInput from "../../../components/common/inputs/CustomInput"
import CustomButton from "../../../components/common/buttons/CustomButton"
import { signUpMock } from "../../../services/mocks/auth"
import { useAuthStore, type User } from "../../../store/auth"
import { signUpSchema } from "./SignUpForm.schema"
import { setLocalStorage, getLocalStorage } from "../../../utils/localStorage"
import { hasAuthDataTokens } from "../../../modules/auth/auth.utils"
import { type SignInMockResponse } from "../../../services/mocks/auth"
import Dropdown1 from "../../../components/common/dropdowns/Dropdown1"

const GENDER_OPTIONS = [
  { value: 0, label: "Female" },
  { value: 1, label: "Male" },
]

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

    console.log("signUpFormValues", signUpFormValues)

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
      }) => {
        console.log("errors", errors)
        return (
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
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Dropdown1
                  className="mb-5"
                  placeholder="Gender"
                  {...field}
                  options={GENDER_OPTIONS}
                />
              )}
            />
            {/* <Dropdown1
              className="mb-5"
              placeholder="Gender"
              {...register("gender")}
              options={GENDER_OPTIONS}
            /> */}
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
        )
      }}
    </CustomForm1>
  )
}

export default SignInForm
