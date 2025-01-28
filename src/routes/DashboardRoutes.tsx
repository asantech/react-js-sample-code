import AuthRoutes from "./AuthRoutes"
import ComponentRoutes from "./ComponentRoutes"
import GreedyAlgorithm from "@pages/algorithms/greedy/GreedyAlgorithm"

function DashboardRoutes() {
  return (
    <>
      <AuthRoutes />
      <ComponentRoutes />
      <GreedyAlgorithm />
    </>
  )
}

export default DashboardRoutes
