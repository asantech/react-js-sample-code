import ListWrapper from "./ListWrapper"
import DropdownSegment1 from "./DropdownSegment1"
import DropdownSegment2 from "./DropdownSegment2"
import DropdownSegment3 from "./DropdownSegment3"

function Dropdowns() {
  return (
    <div>
      <h1 className="my-3">Dropdowns</h1>
      <p className="mb-5">
        Different dropdown components with different functionalities
      </p>
      <ListWrapper>
        <DropdownSegment1 />
        <DropdownSegment2 />
        <DropdownSegment3 />
      </ListWrapper>
    </div>
  )
}

export default Dropdowns
