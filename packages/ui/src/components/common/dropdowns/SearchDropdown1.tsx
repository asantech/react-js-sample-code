import { useState, useMemo, useRef, ChangeEvent } from "react"
import clsx from "clsx"

import CustomSpinner from "../spinners/CustomSpinner"
import Dropdown2 from "./Dropdown2"
import { DropdownMenuPosition } from "./Dropdown.utils"
import {
  debouncedOnChange,
  getOfflineSearchTypePredicate,
  removeTextExtraWhiteSpaces,
  SearchType,
  DEFAULT_OPTION,
  SearchDropdownProps,
  ClearSearchTextButtonProps,
  SpinnerWrapperProps,
  SearchInputProps,
} from "./SearchDropdown.utils"

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
}: Readonly<SearchDropdownProps>) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [searchedText, setSearchedText] = useState("")

  const searchPredicate = useMemo(() => {
    const refinedSearchText = noExtraWhiteSpaces
      ? removeTextExtraWhiteSpaces(searchedText)
      : searchedText
    return getOfflineSearchTypePredicate(refinedSearchText)[searchType]
  }, [searchedText, searchType, noExtraWhiteSpaces])

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Dropdown2
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
          onChange={onSearchInputChange}
          onKeyDown={() => {
            debouncedOnChange.cancel()
          }}
        />
        {isLoading && <SpinnerWrapper clearableOnSearch={clearableOnSearch} />}
        {showClearButton && (
          <ClearSearchTextButton clearSearchText={clearSearchText} />
        )}
      </div>
    </Dropdown2>
  )
}

export default SearchDropdown1

const ClearSearchTextButton = ({
  clearSearchText,
}: ClearSearchTextButtonProps) => {
  return (
    <button
      className="w-5 h-5 absolute right-5 cursor-pointer"
      onClick={clearSearchText}
    >
      <img src="/icons/close.svg" alt="Close Icon" />
    </button>
  )
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

const SearchInput = ({
  searchInputRef,
  searchedText,
  className,
  onChange,
  onKeyDown,
}: SearchInputProps) => {
  return (
    <input
      ref={searchInputRef}
      defaultValue={searchedText}
      className={className}
      placeholder="Search..."
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}
