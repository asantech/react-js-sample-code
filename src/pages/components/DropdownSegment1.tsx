import Dropdown1 from "@components/common/dropdowns/Dropdown1"
import COUNTRY_NAMES from "../../mock/db/countries.json"

function DropdownSegment1() {
  return (
    <>
      <p>Different dropdown components with different functionalities</p>
      <h2 className="my-2">Dropdown with offline search</h2>
      <div className="py-5">
        <Dropdown1
          placeholder="Country Name"
          options={COUNTRY_NAMES}
          menuWidth={270}
          hasSearch
        />
      </div>
    </>
  )
}

export default DropdownSegment1
