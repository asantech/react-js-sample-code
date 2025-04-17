import React, { CSSProperties } from "react"

import clsx from "clsx"

type ArrowIcon1Props = {
  className?: string
  style?: CSSProperties
  color?: string
}

const ArrowIcon1 = ({ className, style, color }: Readonly<ArrowIcon1Props>) => {
  return (
    <div style={style}>
      <img
        src={color ? `/icons/down-arrow-${color}.svg` : "/icons/down-arrow.svg"}
        alt="Down Arrow Icon"
        className={clsx(className ?? "w-5 h-5")}
      />
    </div>
  )
}

export default ArrowIcon1
