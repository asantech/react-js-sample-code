import { useState } from "react"

import { getCountries } from "../../services/mocks/search"
import { DropdownOption } from "./components"
import SearchDropdown1 from "../../components/common/dropdowns/SearchDropdown1"

function DropdownSegment2() {
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
      <p>Configuration approach is used</p>
      <div className="py-5">
        <SearchDropdown1
          placeholder="Country Name"
          menuWidth={270}
          options={countries}
          onChangeCallback={onSearchInputChange}
          isOnline
          isLoading={isSearching}
          minSearchTextLength={1}
        />
      </div>
    </div>
  )
}

export default DropdownSegment2
