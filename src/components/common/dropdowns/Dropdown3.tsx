import {
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  CSSProperties,
  RefObject,
} from "react"
import clsx from "clsx"

import { DropdownOption } from "@type/components"
import ArrowIcon1 from "../icons/ArrowIcon1"
import {
  DropdownMenuPosition,
  DEFAULT_OPTION,
  DEFAULT_MENU_ITEM_HEIGHT,
} from "./Dropdown.utils"

type DropdownProps = {
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

type DropdownRootProps = {
  className?: string
  dropdownRef?: RefObject<HTMLDivElement>
}

const DropdownRoot = ({
  className = "",
  dropdownRef,
  children,
}: PropsWithChildren<DropdownRootProps>) => {
  return (
    <div ref={dropdownRef} className={clsx("relative inline-block", className)}>
      {children}
    </div>
  )
}

type DropdownButtonProps = {
  onClick: () => void
}

const DropdownButton = ({
  children,
  onClick,
}: PropsWithChildren<DropdownButtonProps>) => {
  return (
    <button type="button" onClick={onClick}>
      <div className="flex justify-center items-center gap-4 py-3 px-5 bg-white border-solid border-gray-400 rounded-lg border-2">
        {children}
      </div>
    </button>
  )
}

type DropdownMenuProps = PropsWithChildren<{
  className: string
  menuWidth?: string | number
}>

const DropdownMenu = ({
  className,
  menuWidth = "100%",
  children,
}: DropdownMenuProps) => {
  const dropdownMenuStyle = {
    width: menuWidth,
    zIndex: 1,
  }

  return (
    <div className={className} style={dropdownMenuStyle}>
      {children}
    </div>
  )
}

const DropdownMenuOptions = ({
  style,
  children,
}: PropsWithChildren<{ style: CSSProperties }>) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto" style={style}>
      {children}
    </div>
  )
}

type DropdownMenuOptionProps = {
  option: DropdownOption
  selectedOption: DropdownOption
  onOptionClick: (option: DropdownOption) => void
}

const DropdownMenuOption = ({
  option,
  selectedOption,
  onOptionClick,
  children,
}: PropsWithChildren<DropdownMenuOptionProps>) => {
  const isSelectedOption = selectedOption === option
  const menuOptionClassName = clsx(
    "text-left w-full hover:bg-gray-200 py-3 px-4 one-line-ellipsis h-12",
    isSelectedOption && "bg-gray-100"
  )
  return (
    <button
      type="button"
      className={menuOptionClassName}
      onClick={() => {
        onOptionClick(option)
      }}
    >
      {children}
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

const DropdownText = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>) => {
  return <span className={className}>{children}</span>
}

const Dropdown = {
  Root: DropdownRoot,
  Button: DropdownButton,
  Text: DropdownText,
  Menu: DropdownMenu,
  MenuOptions: DropdownMenuOptions,
  MenuOption: DropdownMenuOption,
  Label,
  NoOptionsMessage,
  ErrorMessage,
}

const Dropdown3 = ({
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
  hasOptionsAddedCondition = true,
  hasNoOptionsAddedCondition = true,
  children,
}: PropsWithChildren<DropdownProps>) => {
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
  const selectedOptionLabel = selectedOption.label
  const dropdownText = selectedOptionLabel ? selectedOptionLabel : placeholder
  const dropdownTextClassName = clsx(!selectedOptionLabel && "text-zinc-400")
  const arrowIconClassName = clsx("w-5 h-5", menuOpened && "rotate-180")

  return (
    <Dropdown.Root dropdownRef={dropdownRef} className={className}>
      {label && <Dropdown.Label>{label}</Dropdown.Label>}
      {
        <Dropdown.Button onClick={toggleMenuDisplay}>
          <Dropdown.Text className={dropdownTextClassName}>
            {dropdownText}
          </Dropdown.Text>
          <ArrowIcon1 className={arrowIconClassName} />
        </Dropdown.Button>
      }
      {menuOpened && (
        <Dropdown.Menu className={dropdownMenuClassName} menuWidth={menuWidth}>
          {children}
          {hasNoOptions && <Dropdown.NoOptionsMessage />}
          {hasOptions && (
            <Dropdown.MenuOptions style={menuOptionsWrapperStyle}>
              {options?.map((option: DropdownOption, index: number) => (
                <DropdownMenuOption
                  key={index}
                  option={option}
                  selectedOption={selectedOption}
                  onOptionClick={onMenuOptionClick}
                >
                  {option.label}
                </DropdownMenuOption>
              ))}
            </Dropdown.MenuOptions>
          )}
        </Dropdown.Menu>
      )}
      {errorMessage && (
        <Dropdown.ErrorMessage>{errorMessage}</Dropdown.ErrorMessage>
      )}
    </Dropdown.Root>
  )
}

export default Dropdown3
