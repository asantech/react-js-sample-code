import { ReactNode } from "react"
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export type FormValues = {
  [key: string]: string
}

type CustomForm = {
  children: ({
    register,
    errors,
  }: {
    register: UseFormRegister<FormValues>
    errors: FieldErrors
  }) => ReactNode
  schema: any
  onSubmit: (formValues: FormValues) => void
}

function CustomForm({ children, schema, onSubmit }: Readonly<CustomForm>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {children({ register, errors })}
    </form>
  )
}

export default CustomForm
