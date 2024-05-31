import { useState } from "react"

import Dropdown1 from "@components/common/dropdowns/Dropdown1"
import { getCountries } from "@services/mocks/search"
import { DropdownOption } from "@types/components"

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
    } catch (error: any) {
      console.log("Error: ", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <>
      <h2 className="my-2">Dropdown with online search</h2>
      <div className="py-5">
        <Dropdown1
          placeholder="Country Name"
          menuWidth={270}
          onChangeCallback={onSearchInputChange}
          hasSearch
          isOnline
          isLoading={isSearching}
          options={countries}
        />
      </div>
    </>
  )
}

export default DropdownSegment2
