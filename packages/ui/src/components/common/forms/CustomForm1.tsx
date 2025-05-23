import React, { ReactNode } from "react"
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export type FormValues = {
  [key: string]: string
}

type CustomForm1 = {
  children: ({
    register,
    errors,
  }: {
    register: UseFormRegister<FormValues>
    errors: FieldErrors
    control: any
  }) => ReactNode
  schema: any
  onSubmit: (formValues: FormValues) => void
}

function CustomForm1({ children, schema, onSubmit }: Readonly<CustomForm1>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {children({ register, errors, control })}
    </form>
  )
}

export default CustomForm1
