import clsx from "clsx"

type CustomSpinnerProps = {
  addedClassName: string
}

function CustomSpinner({
  addedClassName = "border-t-sky-500",
}: CustomSpinnerProps) {
  return (
    <div
      className={clsx(
        "w-5 h-5 rounded-full border-2 border-solid border-t-2 border-gray-300 animate-spin",
        addedClassName
      )}
    ></div>
  )
}

export default CustomSpinner
