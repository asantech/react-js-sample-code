import { PropsWithChildren } from "react"
import clsx from "clsx"

import { Variant } from "../../../types/styles"
import { buttonVariants } from "./CustomButton.constants"
import CustomSpinner from "../spinners/CustomSpinner"

type CustomButtonProps = {
  type?: "button" | "submit"
  variant?: Variant
  className?: string
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

function CustomButton({
  children,
  type = "button",
  variant,
  className,
  isLoading,
  isDisabled,
  onClick,
}: Readonly<PropsWithChildren<CustomButtonProps>>) {
  return (
    <button
      className={clsx(
        "inline-flex gap-4 py-3 px-5 rounded-lg font-semibold hover:bg-sky-600 hover:text-white focus:ring focus:ring-sky-300",
        variant && buttonVariants[variant],
        className
      )}
      type={type}
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
      {isLoading && <CustomSpinner />}
    </button>
  )
}

export default CustomButton
