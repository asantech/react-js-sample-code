import { useState, useRef, useEffect, useMemo } from "react"
import clsx from "clsx"
import isArray from "lodash/isArray"
import debounce from "lodash/debounce"

import { DropdownOption } from "@types/components"
import ArrowButton1 from "@components/buttons/ArrowButton1"
import CustomSpinner from "../spinners/CustomSpinner"

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
  hasSearch?: boolean
  maxVisibleItemsCount?: number
  menuWidth?: string | number
  isLoading?: boolean
  isOnline?: boolean
  searchType?: SearchType
  onSelectOption?: (option: DropdownOption) => void
  onChangeCallback?: (inputValue: string) => void
}

const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })
const DEFAULT_MENU_ITEM_HEIGHT = 48

const debouncedOnChange = debounce((func) => {
  func()
}, 700)

const getSearchTypePredicate = (searchedText: string) => ({
  [SearchType.INCLUDES]: (item: DropdownOption) =>
    item.label.toLowerCase().includes(searchedText.toLowerCase()),
  [SearchType.INCLUDES_STRICT]: (item: DropdownOption) =>
    item.label.includes(searchedText),
  [SearchType.EXACT]: (item: DropdownOption) =>
    item.label.toLowerCase() === searchedText.toLowerCase(),
  [SearchType.EXACT_STRICT]: (item: DropdownOption) =>
    item.label === searchedText,
})

const Dropdown1 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options,
  menuPosition = DropdownMenuPosition.BOTTOM,
  disabled = false,
  label,
  errorMessage,
  hasSearch = false,
  maxVisibleItemsCount = 4,
  isLoading = false,
  menuWidth = "100%",
  isOnline,
  searchType,
  onSelectOption,
  onChangeCallback,
}: Readonly<Dropdown1Props>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState<DropdownOption>(option)
  const [menuOpened, setMenuOpened] = useState(false)
  const [searchedText, setSearchedText] = useState("")

  const searchPredicate = useMemo(
    () => getSearchTypePredicate(searchedText)[searchType as SearchType],
    [searchedText, searchType]
  )

  const toggleMenuDisplay = () => {
    setMenuOpened((menuOpenState) => !menuOpenState)
  }

  const selectOption = (option: DropdownOption) => {
    if (disabled) return
    setSelectedOption(option)
    setMenuOpened(false)
    onSelectOption?.(option)
  }

  const onSearchInputChange = (event: any) => {
    const searchInputValue = event.target.value
    setSearchedText(searchInputValue)
    debouncedOnChange(() => {
      onChangeCallback?.(searchInputValue)
    })
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

  const offlineFilteredOptions = searchType
    ? options?.filter(searchPredicate)
    : options

  const generatedOptions = isOnline ? options : offlineFilteredOptions
  const hasNoOptions =
    !isLoading &&
    searchedText &&
    isArray(generatedOptions) &&
    !generatedOptions.length
  const hasOptions =
    !isLoading && isArray(generatedOptions) && Boolean(generatedOptions.length)

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
          <ArrowButton1
            className={clsx("w-5 h-5", menuOpened && "rotate-180")}
          />
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
          {hasSearch && (
            <div className="py-3 px-4 relative flex items-center">
              <input
                className={clsx(
                  "w-full py-2 outline-none bg-slate-200 rounded-md",
                  isLoading ? "pl-3 pr-9" : "px-3"
                )}
                placeholder="Search..."
                value={searchedText}
                onChange={onSearchInputChange}
                onKeyDown={() => {
                  debouncedOnChange.cancel()
                }}
              ></input>
              {isLoading && (
                <div className="w-5 h-5 absolute right-6">
                  <CustomSpinner />
                </div>
              )}
            </div>
          )}
          {hasNoOptions && <div className="p-4 w-max">Has no options</div>}
          {hasOptions && (
            <div
              className="overflow-x-hidden overflow-y-auto"
              style={{
                maxHeight: maxVisibleItemsCount * DEFAULT_MENU_ITEM_HEIGHT,
              }}
            >
              {generatedOptions?.map(
                (option: DropdownOption, index: number) => {
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
                }
              )}
            </div>
          )}
        </div>
      )}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  )
}

export default Dropdown1
