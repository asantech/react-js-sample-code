import { PropsWithChildren } from "react"

function ListWrapper({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-3">{children}</div>
}

export default ListWrapper
