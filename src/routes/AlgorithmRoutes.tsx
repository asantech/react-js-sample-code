import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import GreedyAlgorithm from "@pages/algorithms/greedy/GreedyAlgorithm"

function AlgorithmRoutes() {
  return (
    <Routes>
      <Route path={routes.ALGORITHMS.GREEDY} element={<GreedyAlgorithm />} />
    </Routes>
  )
}

export default AlgorithmRoutes
