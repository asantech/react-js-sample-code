import AuthRoutes from "./AuthRoutes"
import ComponentRoutes from "./ComponentRoutes"
import QuizesRoute from "./QuizesRoute"
import TopicsRoute from "./TopicsRoute"

function DashboardRoutes() {
  return (
    <>
      <AuthRoutes />
      <ComponentRoutes />
      <TopicsRoute />
      <QuizesRoute />
    </>
  )
}

export default DashboardRoutes
