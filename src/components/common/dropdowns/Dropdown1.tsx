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
}

const DEFAULT_OPTION = { value: "", label: "" }

function Dropdown1({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options = [],
  menuPosition = "top",
  disabled = false,
}: Readonly<Dropdown1Props>) {
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

  const hasOptions = options.length

  return (
    <div ref={dropdownRef} className={clsx("relative", className)}>
      <button
        onClick={() => {
          toggleMenuDisplay()
        }}
      >
        <input
          className="py-3 px-5 bg-white border-solid border-gray-400 rounded border-2"
          value={selectedOption.label}
          placeholder={placeholder}
        />
      </button>
      {menuDisplayed && (
        <>
          {!hasOptions && <NoOptionsFoundMessage />}
          {
            <div
              className={clsx(
                "absolute bg-white border-solid border-gray-400 rounded border-2",
                menuPosition === "top" ? "top-15" : "bottom-15"
              )}
            >
              {options.map((option: DropdownOption, index: number) => {
                const key = index
                return (
                  <button
                    key={key}
                    className="text-left w-full hover:bg-gray-100 py-3 px-4"
                    onClick={() => {
                      selectOption(option)
                    }}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          }
        </>
      )}
    </div>
  )
}

export default Dropdown1

const NoOptionsFoundMessage = () => {
  return (
    <div className="absolute bg-white p-4 border-solid border-gray-400 rounded border-2">
      Has no options
    </div>
  )
}