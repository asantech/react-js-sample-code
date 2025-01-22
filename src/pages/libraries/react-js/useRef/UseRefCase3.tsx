import { useState, useRef } from 'react'

import CustomButton from '@components/common/buttons/CustomButton'

function UseRefCase3() {
  const firstRef = useRef(0)
  const secondRef = useRef(0)
  const [, setRender] = useState(0)

  const inCrementValue1 = () => {
    firstRef.current = firstRef.current + 1
    setRender(prev => prev + 1)
  }

  const inCrementValue2 = () => {
    setRender(prev => prev + 1)
    secondRef.current = secondRef.current + 1
  }
  return (
    <>
      <h1 className='font-bold mb-3 text-gray-800'>
        It doesn't matter whether you put the ref value change before the
        useState setter function
      </h1>
      <p className='mb-1'>
        Case 1. The ref value change is before the setter function
      </p>
      <CustomButton onClick={inCrementValue1}>Change Value</CustomButton>
      <span>{firstRef.current}</span>
      <p className='mb-1'>
        Case 2. The ref value change is after the setter function
      </p>
      <CustomButton onClick={inCrementValue2}>Change Value</CustomButton>
      <span>{secondRef.current}</span>
      <h2>Notes:</h2>
      <p>
        1. these cases might be used when rerendering the component might not be
        fast enought for the high speed of the event occuring, for example light
        touch move in cellphones. So we use a ref for saving the high speed
        value changes
      </p>
    </>
  )
}

export default UseRefCase3
