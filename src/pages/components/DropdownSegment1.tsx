import COUNTRY_NAMES from "../../mock/db/countries.json"
import SearchDropdown1 from "@components/common/dropdowns/SearchDropdown1"

function DropdownSegment1() {
  return (
    <>
      <p>Different dropdown components with different functionalities</p>
      <h2 className="my-2">Dropdown with offline search</h2>
      <div className="py-5">
        <SearchDropdown1
          placeholder="Country Name"
          options={COUNTRY_NAMES}
          menuWidth={270}
        />
      </div>
    </>
  )
}

export default DropdownSegment1
