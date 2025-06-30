import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import JSQuizes from "../pages/quiz/JSQuizes"
import ReactJSQuizes from "../pages/quiz/ReactJSQuizes"

function QuizesRoute() {
  return (
    <Routes>
      <Route path={routes.QUIZ.JS} element={<JSQuizes />} />
      <Route path={routes.QUIZ.REACT_JS} element={<ReactJSQuizes />} />
    </Routes>
  )
}

export default QuizesRoute
