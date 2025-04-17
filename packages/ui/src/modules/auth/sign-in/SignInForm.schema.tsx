import * as yup from "yup"

export const signInSchema = yup
  .object({
    email: yup.string().required().min(5).max(30).email(),
    password: yup.string().required().min(5).max(20),
  })
  .required()
