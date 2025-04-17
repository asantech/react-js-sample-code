import React from "react"
import CustomButton from "../../../components/common/buttons/CustomButton"

type SidebarToggleButtonProps = {
  toggleExpandState: () => void
}

function SidebarToggleButton({
  toggleExpandState,
}: Readonly<SidebarToggleButtonProps>) {
  return (
    <CustomButton variant="primary" onClick={() => toggleExpandState()}>
      Toggle
    </CustomButton>
  )
}

export default SidebarToggleButton
