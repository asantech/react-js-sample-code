import { RefObject, ChangeEvent } from "react"
import debounce from "lodash/debounce"

import { DropdownOption } from "@type/components"
import { DropdownMenuPosition } from "./Dropdown.utils"

export enum SearchType {
  INCLUDES = "includes",
  INCLUDES_STRICT = "includes-strict",
  EXACT = "exact",
  EXACT_STRICT = "exact-strict",
}

export const debouncedOnChange = debounce((func) => {
  func()
}, 700)

export const getOfflineSearchTypePredicate = (searchedText: string) => ({
  [SearchType.INCLUDES]: (item: DropdownOption) =>
    item.label.toLowerCase().includes(searchedText.toLowerCase()),
  [SearchType.INCLUDES_STRICT]: (item: DropdownOption) =>
    item.label.includes(searchedText),
  [SearchType.EXACT]: (item: DropdownOption) =>
    item.label.toLowerCase() === searchedText.toLowerCase(),
  [SearchType.EXACT_STRICT]: (item: DropdownOption) =>
    item.label === searchedText,
})

export const removeTextExtraWhiteSpaces = (text: string) => {
  const refinedText = text.split(/\s+/).join(" ")
  return refinedText
}

export const DEFAULT_OPTION = Object.freeze({ value: "", label: "" })

export type SearchDropdownProps = {
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

export type ClearSearchTextButtonProps = {
  clearSearchText: () => void
}

export type SpinnerWrapperProps = {
  clearableOnSearch: boolean
}

export type SearchInputProps = {
  searchInputRef: RefObject<HTMLInputElement>
  className: string
  searchedText: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: () => void
}
