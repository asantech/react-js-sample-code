import React, { CSSProperties } from "react"

import clsx from "clsx"
import downArrow from "../../assets/icons/down-arrow.svg"
import downArrowWhite from "../../assets/icons/down-arrow-white.svg"

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
        src={color ? downArrowWhite : downArrow}
        alt="Down Arrow Icon"
        className={clsx(className ?? "w-5 hs-5")}
      />
    </button>
  )
}

export default ArrowButton1
