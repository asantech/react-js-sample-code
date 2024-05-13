import { useState } from "react"
import clsx from "clsx"

type DropdownOption = { value: string; label: string }
type DropdownMenuPosition = "top" | "bottom"

type Dropdown1Props = {
  placeholder?: string
  option?: DropdownOption
  options?: DropdownOption[]
  menuPosition?: DropdownMenuPosition
  disabled?: boolean
}

function Dropdown1({
  placeholder = "",
  option = { value: "", label: "" },
  options = [],
  menuPosition = "top",
  disabled = false,
}: Readonly<Dropdown1Props>) {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(option)
  const [menuDisplayed, setMenuDisplayed] = useState(false)

  const toggleMenuDisplay = () => {
    setMenuDisplayed((menuDisplay) => !menuDisplay)
  }

  const selectOption = (option: DropdownOption) => {
    if (disabled) return
    setSelectedOption(option)
  }

  const hasOptions = options.length

  return (
    <div className="relative">
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
          {!hasOptions && (
            <div className="absolute bg-white p-4 border-solid border-gray-400 rounded border-2">
              Has no options
            </div>
          )}
          {
            <div
              className={clsx(
                "absolute bg-white p-5 border-solid border-gray-400 rounded border-2",
                menuPosition === "top" ? "bottom-0" : "top-0"
              )}
            >
              {options.map((option: DropdownOption, index: number) => {
                const key = index
                return (
                  <button
                    key={key}
                    className="text-left hover:bg-cyan-600"
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
