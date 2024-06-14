import COUNTRY_NAMES from "../../mock/db/countries.json"
import SearchDropdown1 from "@components/common/dropdowns/SearchDropdown1"

function DropdownSegment1() {
  return (
    <div className="py-3 px-4">
      <p>Different dropdown components with different functionalities</p>
      <h2 className="my-2">Dropdown with offline search</h2>
      <p>Configuration approach is used</p>
      <div className="py-5">
        <SearchDropdown1
          placeholder="Country Name"
          options={COUNTRY_NAMES}
          menuWidth={270}
          minSearchTextLength={3}
        />
      </div>
    </div>
  )
}

export default DropdownSegment1
