import AuthRoutes from "./AuthRoutes"
import ComponentRoutes from "./ComponentRoutes"
import LibrariesRoutes from "./LibrariesRoutes"

function DashboardRoutes() {
  return (
    <>
      <AuthRoutes />
      <ComponentRoutes />
      <LibrariesRoutes/>
    </>
  )
}

export default DashboardRoutes
