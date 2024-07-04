import COUNTRY_NAMES from "../../mock/db/countries.json"
import SearchDropdown1 from "@components/common/dropdowns/SearchDropdown1"
import DropdownSegmentWrapper from "./DropdownSegmentWrapper"

function DropdownSegment1() {
  return (
    <DropdownSegmentWrapper>
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
    </DropdownSegmentWrapper>
  )
}

export default DropdownSegment1
