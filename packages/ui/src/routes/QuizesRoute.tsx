import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import JSQuizes from "../pages/quiz/JSQuizes"
import JSNotes from "../pages/quiz/JSNotes"
import ReactJSQuizes from "../pages/quiz/ReactJSQuizes"
import ReactJsSources from "../pages/quiz/ReactJsSources"
import WebFundamentals from "../pages/quiz/WebFundamentals"

function QuizesRoute() {
  return (
    <Routes>
      <Route path={routes.QUIZ.JS} element={<JSQuizes />} />
      <Route path={routes.QUIZ.JS_NOTES} element={<JSNotes />} />
      <Route path={routes.QUIZ.REACT_JS} element={<ReactJSQuizes />} />
      <Route path={routes.QUIZ.REACT_JS_SOURCES} element={<ReactJsSources />} />
      <Route
        path={routes.QUIZ.WEB_FUNDAMENTALS}
        element={<WebFundamentals />}
      />
    </Routes>
  )
}

export default QuizesRoute
