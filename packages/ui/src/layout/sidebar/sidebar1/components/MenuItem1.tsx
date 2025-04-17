import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"

type MenuItem1Props = {
  label: string
  linkPath: string
  className?: string
  labelIndentation: number
  nestedLevel: number
}

function MenuItem1({
  label,
  linkPath,
  className,
  labelIndentation,
  nestedLevel,
}: Readonly<MenuItem1Props>) {
  return (
    <Link
      className={clsx("block one-line-ellipsis", className)}
      to={linkPath}
      style={{
        direction: "ltr",
        paddingLeft: `${nestedLevel * labelIndentation}px`,
        paddingRight: `${labelIndentation}px`,
      }}
    >
      {label}
    </Link>
  )
}

export default MenuItem1
