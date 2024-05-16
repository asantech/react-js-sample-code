import { useState, useRef, useEffect } from "react"
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
  label?: string
  errorMessage?: string
  [key: string]: any
}

const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })

const Dropdown1 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options = [],
  menuPosition = "bottom",
  disabled = false,
  label,
  errorMessage,
  ...otherProps
}: Readonly<Dropdown1Props>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(option)
  const [menuDisplayed, setMenuDisplayed] = useState(false)

  const toggleMenuDisplay = () => {
    setMenuDisplayed((menuDisplay) => !menuDisplay)
  }

  const selectOption = (option: DropdownOption) => {
    if (disabled) return
    setSelectedOption(option)
    setMenuDisplayed(false)
    otherProps.onChange(option.value)
  }

  useEffect(() => {
    const handleClickOutsideOfDropdown = (event: any) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target))
        return
      setMenuDisplayed(false)
    }
    document.addEventListener("mousedown", handleClickOutsideOfDropdown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOfDropdown)
    }
  }, [])

  const hasOptions = Boolean(options.length)

  return (
    <div ref={dropdownRef} className={clsx("relative inline-block", className)}>
      {label && <label className="inline-flex mb-0.5">{label}</label>}
      <button
        type="button"
        onClick={() => {
          toggleMenuDisplay()
        }}
      >
        <div className="flex justify-center items-center gap-4 py-3 px-5 bg-white border-solid border-gray-400 rounded-lg border-2">
          <span className={clsx(!selectedOption.label && "text-zinc-400")}>
            {selectedOption.label ? selectedOption.label : placeholder}
          </span>
          <img
            src="/svgs/down-arrow.svg"
            alt="Down Arrow Icon"
            className={clsx("w-5 h-5", menuDisplayed && "rotate-180")}
          />
        </div>
      </button>
      {menuDisplayed && (
        <div
          className={clsx(
            "absolute bg-white border-solid border-gray-400 rounded border-2",
            menuPosition === "top" ? "bottom-14" : "top-14"
          )}
        >
          {!hasOptions && <div className="p-4 w-max">Has no options</div>}
          {hasOptions &&
            options.map((option: DropdownOption, index: number) => {
              const key = index
              return (
                <button
                  key={key}
                  type="button"
                  className={clsx(
                    "text-left w-full hover:bg-gray-200 py-3 px-4",
                    selectedOption === option && "bg-gray-100"
                  )}
                  onClick={() => {
                    selectOption(option)
                  }}
                >
                  {option.label}
                </button>
              )
            })}
        </div>
      )}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  )
}

export default Dropdown1
