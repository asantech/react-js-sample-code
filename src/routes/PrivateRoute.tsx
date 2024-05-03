import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"

type ProtectedRoute = {
  isAllowed: boolean
  redirectTo: string
}

export default function ProtectedRoute({
  isAllowed,
  redirectTo,
  children,
}: PropsWithChildren<ProtectedRoute>) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }
  return children
}
