import React, {
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  CSSProperties,
} from "react"
import clsx from "clsx"

import { DropdownOption } from "../../../types/components"
import ArrowIcon1 from "../icons/ArrowIcon1"
import {
  DropdownMenuPosition,
  DEFAULT_OPTION,
  DEFAULT_MENU_ITEM_HEIGHT,
} from "./Dropdown.utils"

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
  hasOptionsAddedCondition?: boolean
  hasNoOptionsAddedCondition?: boolean
}

const Dropdown2 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options = [],
  menuPosition = DropdownMenuPosition.BOTTOM,
  disabled = false,
  label,
  errorMessage,
  maxVisibleItemsCount = 4,
  menuWidth,
  onSelectOption,
  children,
  hasOptionsAddedCondition = true,
  hasNoOptionsAddedCondition = true,
}: PropsWithChildren<Readonly<Dropdown1Props>>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState<DropdownOption>(option)
  const [menuOpened, setMenuOpened] = useState(false)

  const toggleMenuDisplay = () => {
    setMenuOpened((menuOpenState) => !menuOpenState)
  }

  const selectOption = (option: DropdownOption) => {
    const isClickedOptionSelectedOption = selectedOption === option
    if (disabled || isClickedOptionSelectedOption) return
    setSelectedOption(option)
    setMenuOpened(false)
    onSelectOption?.(option)
  }

  const onMenuOptionClick = (option: DropdownOption) => {
    selectOption(option)
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

  const dropdownMenuClassName = clsx(
    "absolute bg-white border-solid border-gray-400 rounded border-2",
    menuPosition === "top" ? "bottom-14" : "top-14"
  )

  const menuOptionsWrapperStyle = {
    maxHeight: maxVisibleItemsCount * DEFAULT_MENU_ITEM_HEIGHT,
  }

  const hasNoOptions = !options.length && hasNoOptionsAddedCondition
  const hasOptions = Boolean(options.length) && hasOptionsAddedCondition

  return (
    <div ref={dropdownRef} className={clsx("relative inline-block", className)}>
      {label && <Label>{label}</Label>}
      {
        <DropdownButton
          menuOpened={menuOpened}
          placeholder={placeholder}
          selectedOptionLabel={selectedOption.label}
          onClick={toggleMenuDisplay}
        />
      }
      {menuOpened && (
        <Dropdown2Menu
          className={dropdownMenuClassName}
          hasNoOptions={hasNoOptions}
          hasOptions={hasOptions}
          options={options}
          selectedOption={selectedOption}
          menuWidth={menuWidth}
          menuOptionsWrapperStyle={menuOptionsWrapperStyle}
          onOptionClick={onMenuOptionClick}
        >
          {children}
        </Dropdown2Menu>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}

export default Dropdown2

type DropdownButtonProps = {
  placeholder: string
  selectedOptionLabel: string
  menuOpened: boolean
  onClick: () => void
}

const DropdownButton = ({
  placeholder,
  selectedOptionLabel,
  menuOpened,
  onClick,
}: DropdownButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      <div className="flex justify-center items-center gap-4 py-3 px-5 bg-white border-solid border-gray-400 rounded-lg border-2">
        <span className={clsx(!selectedOptionLabel && "text-zinc-400")}>
          {selectedOptionLabel ? selectedOptionLabel : placeholder}
        </span>
        <ArrowIcon1 className={clsx("w-5 h-5", menuOpened && "rotate-180")} />
      </div>
    </button>
  )
}

type Dropdown2MenuOptionsProps = {
  options: DropdownOption[]
  selectedOption: DropdownOption
  style: CSSProperties
  onOptionClick: (option: DropdownOption) => void
}

type Dropdown2MenuProps = PropsWithChildren<
  Omit<Dropdown2MenuOptionsProps, "style"> & {
    className: string
    hasNoOptions: boolean
    hasOptions: boolean
    menuWidth?: string | number
    menuOptionsWrapperStyle: CSSProperties
  }
>

const Dropdown2Menu = ({
  className,
  menuWidth = "100%",
  menuOptionsWrapperStyle,
  options,
  selectedOption,
  hasNoOptions,
  hasOptions,
  onOptionClick,
  children,
}: Dropdown2MenuProps) => {
  const dropdownMenuStyle = {
    width: menuWidth,
    zIndex: 1,
  }

  return (
    <div className={className} style={dropdownMenuStyle}>
      {children}
      {hasNoOptions && <NoOptionsMessage />}
      {hasOptions && (
        <Dropdown2MenuOptions
          options={options}
          selectedOption={selectedOption}
          style={menuOptionsWrapperStyle}
          onOptionClick={onOptionClick}
        />
      )}
    </div>
  )
}

const Dropdown2MenuOptions = ({
  options,
  selectedOption,
  style,
  onOptionClick,
}: Dropdown2MenuOptionsProps) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto" style={style}>
      {options?.map((option: DropdownOption, index: number) => {
        const key = index
        const isSelectedOption = selectedOption === option
        const menuOptionClassName = clsx(
          "text-left w-full hover:bg-gray-200 py-3 px-4 one-line-ellipsis h-12",
          isSelectedOption && "bg-gray-100"
        )

        return (
          <Dropdown2MenuOption
            key={key}
            option={option}
            menuOptionClassName={menuOptionClassName}
            onOptionClick={onOptionClick}
          />
        )
      })}
    </div>
  )
}

type Dropdown2MenuOptionProps = {
  option: DropdownOption
  menuOptionClassName: string
  onOptionClick: (option: DropdownOption) => void
}

const Dropdown2MenuOption = ({
  option,
  menuOptionClassName,
  onOptionClick,
}: Dropdown2MenuOptionProps) => {
  return (
    <button
      type="button"
      className={menuOptionClassName}
      onClick={() => {
        onOptionClick(option)
      }}
    >
      {option.label}
    </button>
  )
}

const Label = ({ children }: PropsWithChildren) => (
  <label className="inline-flex mb-0.5">{children}</label>
)
const NoOptionsMessage = () => <div className="p-4 w-max">Has no options</div>
const ErrorMessage = ({ children }: PropsWithChildren) => (
  <p className="text-red-600">{children}</p>
)
