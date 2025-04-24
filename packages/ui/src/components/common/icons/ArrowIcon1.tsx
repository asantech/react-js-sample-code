import React, { CSSProperties } from "react"

import clsx from "clsx"
import downArrow from "../../../assets/down-arrow.svg"
import downArrowWhite from "../../../assets/down-arrow-white.svg"

type ArrowIcon1Props = {
  className?: string
  style?: CSSProperties
  color?: string
}

const ArrowIcon1 = ({ className, style, color }: Readonly<ArrowIcon1Props>) => {
  return (
    <div style={style}>
      <img
        src={color ? downArrowWhite : downArrow}
        alt="Down Arrow Icon"
        className={clsx(className ?? "w-5 h-5")}
      />
    </div>
  )
}

export default ArrowIcon1
