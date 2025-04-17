import React, { RefObject, forwardRef } from "react"
import clsx from "clsx"

import { DropdownOption } from "../../../types/components"

type Dropdown1Props = {
  className?: string
  options?: DropdownOption[]
  disabled?: boolean
}

const Dropdown1 = forwardRef(
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
        ref={ref as RefObject<HTMLSelectElement>}
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

export default Dropdown1

const NoOptionsFoundMessage = () => {
  return (
    <option className="absolute bg-white p-4 border-solid border-gray-400 rounded border-2">
      Has no options
    </option>
  )
}
