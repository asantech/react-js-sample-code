import { useState, useRef, useEffect, PropsWithChildren } from "react"
import clsx from "clsx"

import { DropdownOption } from "@types/components"
import ArrowIcon1 from "../icons/ArrowIcon1"

enum DropdownMenuPosition {
  TOP = "top",
  BOTTOM = "bottom",
}

export enum SearchType {
  INCLUDES = "includes",
  INCLUDES_STRICT = "includes-strict",
  EXACT = "exact",
  EXACT_STRICT = "exact-strict",
}

type Dropdown1Props = {
  className?: string
  placeholder?: string
  option?: DropdownOption
  options?: DropdownOption[]
  menuPosition?: DropdownMenuPosition
  disabled?: boolean
  label?: string
  errorMessage?: string
  maxVisibleItemsCount?: number
  menuWidth?: string | number
  onSelectOption?: (option: DropdownOption) => void
  hasOptionsCondition?: boolean
  hasNoOptionsCondition?: boolean
}

const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })
const DEFAULT_MENU_ITEM_HEIGHT = 48

const Dropdown1 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options = [],
  menuPosition = DropdownMenuPosition.BOTTOM,
  disabled = false,
  label,
  errorMessage,
  maxVisibleItemsCount = 4,
  menuWidth = "100%",
  onSelectOption,
  children,
  hasOptionsCondition = true,
  hasNoOptionsCondition = true,
}: PropsWithChildren<Readonly<Dropdown1Props>>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState<DropdownOption>(option)
  const [menuOpened, setMenuOpened] = useState(false)

  const toggleMenuDisplay = () => {
    setMenuOpened((menuOpenState) => !menuOpenState)
  }

  const selectOption = (option: DropdownOption) => {
    if (disabled) return
    setSelectedOption(option)
    setMenuOpened(false)
    onSelectOption?.(option)
  }

  useEffect(() => {
    const handleClickOutsideOfDropdown = (event: MouseEvent) => {
      if (
        !dropdownRef.current ||
        dropdownRef.current.contains(event.target as Node)
      )
        return
      setMenuOpened(false)
    }
    document.addEventListener("mousedown", handleClickOutsideOfDropdown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOfDropdown)
    }
  }, [])

  const hasNoOptions = !options.length && hasNoOptionsCondition
  const hasOptions = Boolean(options.length) && hasOptionsCondition

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
          <ArrowIcon1 className={clsx("w-5 h-5", menuOpened && "rotate-180")} />
        </div>
      </button>
      {menuOpened && (
        <div
          className={clsx(
            "absolute bg-white border-solid border-gray-400 rounded border-2",
            menuPosition === "top" ? "bottom-14" : "top-14"
          )}
          style={{
            width: menuWidth,
            zIndex: 1,
          }}
        >
          {children}
          {hasNoOptions && <div className="p-4 w-max">Has no options</div>}
          {hasOptions && (
            <div
              className="overflow-x-hidden overflow-y-auto"
              style={{
                maxHeight: maxVisibleItemsCount * DEFAULT_MENU_ITEM_HEIGHT,
              }}
            >
              {options?.map((option: DropdownOption, index: number) => {
                const key = index
                return (
                  <button
                    key={key}
                    type="button"
                    className={clsx(
                      "text-left w-full hover:bg-gray-200 py-3 px-4 one-line-ellipsis h-12",
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
        </div>
      )}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  )
}

export default Dropdown1
