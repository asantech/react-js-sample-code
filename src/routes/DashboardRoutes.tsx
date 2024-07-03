import AuthRoutes from "./AuthRoutes"
import ComponentRoutes from "./ComponentRoutes"
import MockRoutes from "./MockRoutes"

console.log(
  "RAPID_API_AIR_BNB_MOCK_API_KEY",
  import.meta.env.RAPID_API_AIR_BNB_MOCK_API_KEY
)

function DashboardRoutes() {
  return (
    <>
      <AuthRoutes />
      <ComponentRoutes />
      <MockRoutes />
    </>
  )
}

export default DashboardRoutes
