import { forwardRef } from "react"

type CustomInputProps = {
  defaultValue?: string
  placeholder?: string
  error?: string
  label?: string
} & Partial<Record<string, any>>

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ defaultValue, placeholder = "", error, label, ...otherProps }, ref) => {
    return (
      <div className="mb-5">
        {label && <label className="inline-flex mb-0.5">{label}</label>}
        <input
          ref={ref}
          className="h-5 min-h-5 w-full rounded-lg border-2 border-zinc-400 py-6 px-5 focus:border focus:border-blue-400"
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...otherProps}
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    )
  }
)

export default CustomInput
