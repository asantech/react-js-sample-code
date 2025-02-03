import { useState } from 'react'
import clsx from 'clsx'

import CustomButton from '@components/common/buttons/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { getLocalStorage, setLocalStorage } from '@utils/localStorage'
import Divider1 from '@components/common/dividers/Divider1'

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
        <div className='min-w-lg p-5 rounded-lg bg-white absolute top-14 right-0 border-2 border-sky-600'>
          <IsInStrictModeTool1 />
          <Divider1 />
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
    <div className='flex items-center'>
      <span className='text-gray-700 font-semibold mr-2'>Is Strict Mode:</span>
      <input
        type='checkbox'
        checked={isStrictMode}
        onChange={toggleStrictMode}
      />
    </div>
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
