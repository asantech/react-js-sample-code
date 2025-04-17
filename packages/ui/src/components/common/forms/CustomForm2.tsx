import React, {
  PropsWithChildren,
  cloneElement,
  Children,
  isValidElement,
} from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export type FormValues = {
  [key: string]: string
}

type CustomForm2 = {
  schema: any
  onSubmit: (formValues: FormValues) => void
}

const CustomForm2 = ({
  schema,
  children,
  onSubmit,
}: PropsWithChildren<CustomForm2>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const childrenWithProps = Children.map(children, (child) => {
    if (!isValidElement(child)) return
    const name = child.props.name
    if (!name) {
      return child
    }
    const errorMessage = errors?.[name]?.message
    const error = errorMessage ? { errorMessage } : {}
    return cloneElement(child, {
      ...register(name),
      ...error,
    })
  })

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {childrenWithProps}
    </form>
  )
}

export default CustomForm2
