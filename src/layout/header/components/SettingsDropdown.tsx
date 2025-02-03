import { useState } from 'react'
import clsx from 'clsx'

import CustomButton from '@components/common/buttons/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { getLocalStorage, setLocalStorage } from '@utils/localStorage'

type SettingsDropdownProps = {
  className?: string
}

const SettingsDropdown = ({ className }: SettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }
  return (
    <div className={clsx('relative', className)}>
      <CustomButton
        type='submit'
        variant='primary'
        className='h-full'
        onClick={toggleOpen}
      >
        <FontAwesomeIcon icon={faHouse} />
      </CustomButton>
      {isOpen && (
        <div className='min-w-lg p-5 rounded-lg bg-white absolute top-14 right-0'>
          <IsInStrictModeTool1 />
          {/* <IsInStrictModeTool2 /> */}
        </div>
      )}
    </div>
  )
}

export default SettingsDropdown

const IsInStrictModeTool1 = () => {
  const [isStrictMode, setIsStrictMode] = useState(
    !getLocalStorage('isNotStrict')
  )

  const toggleStrictMode = () => {
    setIsStrictMode(prevIsStrictMode => {
      setLocalStorage('isNotStrict', prevIsStrictMode)
      window.location.reload()
      return !prevIsStrictMode
    })
  }

  return (
    <>
      <span>Is Strict Mode:</span>
      <input
        type='checkbox'
        checked={isStrictMode}
        onChange={toggleStrictMode}
      />
    </>
  )
}

// const IsInStrictModeTool2 = () => {
//   const toggleStrictMode = (event: ChangeEvent<HTMLInputElement>) => {
//     setLocalStorage('isNotStrict', Boolean(event.target.value !== 'on'))
//     window.location.reload()
//   }

//   return (
//     <>
//       <span>Is Strict Mode:</span>
//       <input
//         type='checkbox'
//         onChange={toggleStrictMode}
//       />
//     </>
//   )
// }
