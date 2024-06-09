import { useState, useMemo } from "react"
import clsx from "clsx"
import debounce from "lodash/debounce"

import { DropdownOption } from "@types/components"
import CustomSpinner from "../spinners/CustomSpinner"
import Dropdown1 from "./Dropdown1"

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
  isLoading?: boolean
  isOnline?: boolean
  searchType?: SearchType
  onSelectOption?: (option: DropdownOption) => void
  onChangeCallback?: (inputValue: string) => void
}

const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })

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

const SearchDropdown1 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options,
  menuPosition = DropdownMenuPosition.BOTTOM,
  disabled = false,
  label,
  errorMessage,
  maxVisibleItemsCount = 4,
  isLoading = false,
  menuWidth = "100%",
  isOnline,
  searchType = SearchType.INCLUDES,
  onChangeCallback,
}: Readonly<Dropdown1Props>) => {
  const [searchedText, setSearchedText] = useState("")

  const searchPredicate = useMemo(
    () => getSearchTypePredicate(searchedText)[searchType],
    [searchedText, searchType]
  )

  const onSearchInputChange = (event: any) => {
    const searchInputValue = event.target.value
    setSearchedText(searchInputValue)
    debouncedOnChange(() => {
      onChangeCallback?.(searchInputValue)
    })
  }

  const offlineFilteredOptions = options?.filter(searchPredicate)
  const generatedOptions = isOnline ? options : offlineFilteredOptions

  return (
    <Dropdown1
      className={className}
      placeholder={placeholder}
      option={option}
      options={generatedOptions}
      label={label}
      disabled={disabled}
      maxVisibleItemsCount={maxVisibleItemsCount}
      menuWidth={menuWidth}
      menuPosition={menuPosition}
      errorMessage={errorMessage}
      hasNoOptionsCondition={!isLoading && Boolean(searchedText)}
      hasOptionsCondition={!isLoading}
    >
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
    </Dropdown1>
  )
}

export default SearchDropdown1
