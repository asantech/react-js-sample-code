type SidebarToggleButtonProps = {
  toggleExpandState: () => void
}

function SidebarToggleButton({ toggleExpandState }: SidebarToggleButtonProps) {
  return <button onClick={() => toggleExpandState()}>Toggle</button>
}

export default SidebarToggleButton
