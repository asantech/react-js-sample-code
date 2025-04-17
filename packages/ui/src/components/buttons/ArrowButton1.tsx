import React, { CSSProperties } from "react"

import clsx from "clsx"

type ArrowButton1Props = {
  className?: string
  style?: CSSProperties
  onClick?: () => void
  color?: string
}

const ArrowButton1 = ({
  onClick,
  className,
  style,
  color,
}: Readonly<ArrowButton1Props>) => {
  return (
    <button style={style} onClick={onClick}>
      <img
        src={color ? `/icons/down-arrow-${color}.svg` : "/icons/down-arrow.svg"}
        alt="Down Arrow Icon"
        className={clsx(className ?? "w-5 hs-5")}
      />
    </button>
  )
}

export default ArrowButton1
