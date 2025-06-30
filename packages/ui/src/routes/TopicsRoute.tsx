import { Routes, Route } from "react-router-dom"

import { routes } from "./routes"
import JSTopics from "../pages/topics/js/JSTopics"
import ReactJSTopics from "../pages/topics/react-js/ReactJSTopics"
import SecurityTopics from "../pages/topics/security/SecurityTopics"

function TopicsRoute() {
  return (
    <Routes>
      <Route path={routes.TOPICS.JS} element={<JSTopics />} />
      <Route path={routes.TOPICS.REACT_JS} element={<ReactJSTopics />} />
      <Route path={routes.TOPICS.SECURITY} element={<SecurityTopics />} />
    </Routes>
  )
}

export default TopicsRoute
