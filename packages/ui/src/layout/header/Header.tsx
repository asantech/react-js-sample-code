import React, { PropsWithChildren } from "react"

import CustomButton from "../../components/common/buttons/CustomButton"
import useAuth from "../../hooks/mocks/useAuth"

function Header({ children }: Readonly<PropsWithChildren>) {
  const { signOutMock } = useAuth()
  return (
    <header className="flex bg-sky-300 py-4 px-5">
      {children}
      <CustomButton
        type="submit"
        variant="primary"
        className="ms-auto"
        onClick={signOutMock}
      >
        Sign Out
      </CustomButton>
    </header>
  )
}

export default Header
