import * as yup from "yup"

export const signUpSchema = yup
  .object({
    email: yup.string().required().min(5).max(30).email(),
    firstName:  yup.string().required().min(5).max(30),
    lastName:  yup.string().required().min(5).max(30),
    password: yup.string().required().min(5).max(20),
    gender: yup.string().required(),
    passwordRepeat: yup.string().required().min(5).max(20).oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required()
