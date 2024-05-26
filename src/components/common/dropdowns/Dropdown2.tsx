import { forwardRef } from "react"
import clsx from "clsx"

type DropdownOption = {
  value: string | number
  label: string
  data?: Record<string, string>
}
type DropdownMenuPosition = "top" | "bottom"

type Dropdown1Props = {
  className?: string
  placeholder?: string
  option?: DropdownOption
  options?: DropdownOption[]
  menuPosition?: DropdownMenuPosition
  disabled?: boolean
}

const Dropdown2 = forwardRef(
  (
    {
      className = "",
      options = [],
      disabled,
      ...otherProps
    }: Readonly<Dropdown1Props>,
    ref
  ) => {
    const hasOptions = Boolean(options.length)

    return (
      <select
        ref={ref as any}
        disabled={disabled}
        className={clsx(
          "py-3 px-5 bg-white border-solid border-gray-400 rounded-lg border-2 focus:outline-none",
          className
        )}
        {...otherProps}
      >
        {!hasOptions && <NoOptionsFoundMessage />}
        {hasOptions &&
          options.map((option: DropdownOption, index: number) => {
            const key = index
            return (
              <option
                key={key}
                value={option.value}
                className="text-left w-full hover:bg-gray-100 py-3 px-4"
              >
                {option.label}
              </option>
            )
          })}
      </select>
    )
  }
)

export default Dropdown2

const NoOptionsFoundMessage = () => {
  return (
    <option className="absolute bg-white p-4 border-solid border-gray-400 rounded border-2">
      Has no options
    </option>
  )
}
