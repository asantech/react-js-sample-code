import React, { PropsWithChildren } from "react"

import { colors } from "../../constants/colors"
import logo from "../../../../../packages/ui/src/assets/images/logo.png"

function AuthPageWrapper({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div
        className="col-span-6 flex py-20 justify-start items-center flex-col gap-12 h-screen"
        style={{ backgroundColor: colors.blueAlpha }}
      >
        <img src={logo} alt="App Logo" className="w-96 h-96" />
        <div>
          <p className="text-2xl font-semibold text-center mb-4">
            A React JS reference app
          </p>
          <p className="text-xl font-semibold text-center">
            for common components used in websites
          </p>
        </div>
      </div>
      <div className="col-span-6 pt-20">{children}</div>
    </div>
  )
}

export default AuthPageWrapper
