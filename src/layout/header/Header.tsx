import { PropsWithChildren } from 'react'

import CustomButton from '@components/common/buttons/CustomButton'
import useAuth from '@hooks/mocks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import SettingsDropdown from './components/SettingsDropdown'

function Header({ children }: Readonly<PropsWithChildren>) {
  const { signOutMock } = useAuth()
  return (
    <header className='flex bg-sky-300 py-4 px-5'>
      {children}

      <SettingsDropdown className='ms-auto mr-4' />
      <CustomButton
        type='submit'
        variant='primary'
        onClick={signOutMock}
      >
        <FontAwesomeIcon icon={faDoorOpen} />
      </CustomButton>
    </header>
  )
}

export default Header
