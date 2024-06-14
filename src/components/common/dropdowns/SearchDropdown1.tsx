import { useState, useMemo, useRef } from "react"
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
  minSearchTextLength?: number
  searchType?: SearchType
  noExtraWhiteSpaces?: boolean
  clearableOnSearch?: boolean
  onSelectOption?: (option: DropdownOption) => void
  onChangeCallback?: (inputValue: string) => void
}

const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })

const debouncedOnChange = debounce((func) => {
  func()
}, 700)

const getOfflineSearchTypePredicate = (searchedText: string) => ({
  [SearchType.INCLUDES]: (item: DropdownOption) =>
    item.label.toLowerCase().includes(searchedText.toLowerCase()),
  [SearchType.INCLUDES_STRICT]: (item: DropdownOption) =>
    item.label.includes(searchedText),
  [SearchType.EXACT]: (item: DropdownOption) =>
    item.label.toLowerCase() === searchedText.toLowerCase(),
  [SearchType.EXACT_STRICT]: (item: DropdownOption) =>
    item.label === searchedText,
})

const removeTextExtraWhiteSpaces = (text: string) => {
  const refinedText = text.split(/\s+/).join(" ")
  return refinedText
}

const SearchDropdown1 = ({
  className = "",
  placeholder = "",
  option = DEFAULT_OPTION,
  options = [],
  menuPosition = DropdownMenuPosition.BOTTOM,
  disabled = false,
  label,
  errorMessage,
  maxVisibleItemsCount = 4,
  isLoading = false,
  menuWidth = "100%",
  isOnline,
  minSearchTextLength = 1,
  searchType = SearchType.INCLUDES,
  onChangeCallback,
  noExtraWhiteSpaces = true,
  clearableOnSearch = true,
}: Readonly<Dropdown1Props>) => {
  const searchInputRef = useRef<any>()

  const [searchedText, setSearchedText] = useState("")

  const searchPredicate = useMemo(() => {
    const refinedSearchText = noExtraWhiteSpaces
      ? removeTextExtraWhiteSpaces(searchedText)
      : searchedText
    return getOfflineSearchTypePredicate(refinedSearchText)[searchType]
  }, [searchedText, searchType, noExtraWhiteSpaces])

  const onSearchInputChange = (event: any) => {
    const searchInputValue = event.target.value.trim()
    setSearchedText(searchInputValue)
    if (searchInputValue.length < minSearchTextLength) return
    debouncedOnChange(() => {
      onChangeCallback?.(searchInputValue)
    })
  }

  const clearSearchText = () => {
    searchInputRef.current!.value = ""
    setSearchedText("")
  }

  const hasNotSearchTextMinLength = searchedText.length < minSearchTextLength
  const offlineFilteredOptions = hasNotSearchTextMinLength
    ? options
    : options?.filter(searchPredicate)
  const generatedOptions = isOnline ? options : offlineFilteredOptions
  const hasNoOptionsAddedCondition = isOnline
    ? !isLoading && searchedText.length >= minSearchTextLength
    : Boolean(searchedText)
  const showClearButton = clearableOnSearch ? Boolean(searchedText) : !isLoading

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
      hasNoOptionsAddedCondition={hasNoOptionsAddedCondition}
      hasOptionsAddedCondition={!isLoading}
    >
      <div className="py-3 px-4 relative flex items-center">
        <SearchInput
          searchInputRef={searchInputRef}
          searchedText={searchedText}
          className={clsx(
            "w-full py-2 outline-none bg-slate-200 rounded-md",
            searchedText ? (isLoading ? "pl-3 pr-12" : "pl-3 pr-9") : "px-3"
          )}
          onSearchInputChange={onSearchInputChange}
          onKeyDown={() => {
            debouncedOnChange.cancel()
          }}
        />
        {isLoading && <SpinnerWrapper clearableOnSearch={clearableOnSearch} />}
        {showClearButton && (
          <ClearSearchTextButton clearSearchText={clearSearchText} />
        )}
      </div>
    </Dropdown1>
  )
}

export default SearchDropdown1

type ClearSearchTextButtonProps = {
  clearSearchText: () => void
}

const ClearSearchTextButton = ({
  clearSearchText,
}: ClearSearchTextButtonProps) => {
  return (
    <button
      className="w-5 h-5 absolute right-5 cursor-pointer"
      onClick={clearSearchText}
    >
      <img src="/svgs/close.svg" alt="Close Icon" />
    </button>
  )
}

type SpinnerWrapperProps = {
  clearableOnSearch: boolean
}

const SpinnerWrapper = ({ clearableOnSearch }: SpinnerWrapperProps) => {
  return (
    <div
      className={clsx(
        "w-5 h-5 absolute",
        clearableOnSearch ? "right-10" : "right-5"
      )}
    >
      <CustomSpinner />
    </div>
  )
}

type SearchInputProps = {
  searchInputRef: any
  className: string
  searchedText: string
  onSearchInputChange: (event: any) => void
  onKeyDown: () => void
}

const SearchInput = ({
  searchInputRef,
  searchedText,
  className,
  onSearchInputChange,
  onKeyDown,
}: SearchInputProps) => {
  return (
    <input
      ref={searchInputRef}
      defaultValue={searchedText}
      className={className}
      placeholder="Search..."
      onChange={onSearchInputChange}
      onKeyDown={onKeyDown}
    />
  )
}
