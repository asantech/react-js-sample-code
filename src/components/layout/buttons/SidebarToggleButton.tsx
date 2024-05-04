import CustomButton from "../../common/buttons/CustomButton"

type SidebarToggleButtonProps = {
  toggleExpandState: () => void
}

function SidebarToggleButton({ toggleExpandState }: SidebarToggleButtonProps) {
  return (
    <CustomButton variant="primary" onClick={() => toggleExpandState()}>
      Toggle
    </CustomButton>
  )
}

export default SidebarToggleButton
