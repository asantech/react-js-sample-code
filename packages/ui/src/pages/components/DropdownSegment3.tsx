import { useState } from "react"

import { getCountries } from "../../services/mocks/search"
import { DropdownOption } from "../../types/components"
import SearchDropdown2 from "../../components/common/dropdowns/SearchDropdown2"
import { DropdownMenuPosition } from "../../components/common/dropdowns/Dropdown.utils"

function DropdownSegment3() {
  const [isSearching, setIsSearching] = useState(false)
  const [countries, setCountries] = useState<DropdownOption[]>()

  const onSearchInputChange = async (searchedText: string) => {
    if (!searchedText) {
      setIsSearching(false)
      setCountries(undefined)
      return
    }
    setIsSearching(true)
    setCountries(undefined)
    try {
      const response = await getCountries(searchedText)
      setCountries(response)
    } catch (error: unknown) {
      console.log("Error: ", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="py-3 px-4">
      <h2 className="my-2">Dropdown with online search</h2>
      <p>Composition pattern approach is used</p>
      <div className="py-5">
        <SearchDropdown2
          placeholder="Country Name"
          menuWidth={270}
          options={countries}
          onChangeCallback={onSearchInputChange}
          isOnline
          menuPosition={DropdownMenuPosition.TOP}
          isLoading={isSearching}
          minSearchTextLength={1}
        />
      </div>
    </div>
  )
}

export default DropdownSegment3
