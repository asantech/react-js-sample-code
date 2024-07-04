import { PropsWithChildren } from "react"

function DropdownSegmentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="py-3 px-4 border-dashed border-2 border-solid border-gray-200 rounded-xl">
      {children}
    </div>
  )
}

export default DropdownSegmentWrapper
