import { PropsWithChildren, useRef } from 'react'

import Logger from './Logger'
import CustomButton from '@components/common/buttons/CustomButton'
import { RefType } from './useRef.type'

function UseRefCase({ children }: Readonly<PropsWithChildren>) {
  const ref = useRef<RefType>({
    string: 'string',
    number: 0,
    array: []
  })

  const incrementNumber = () => {
    ref.current.number = ref.current.number + 1
    console.log('ref:: increment number', ref.current.number)
  }

  const pushToArray = () => {
    ref.current.array = [...ref.current.array, ref.current.array.length]
    console.log('pushToArray event handler:: ref:: array', ref.current.array)
  }
  return (
    <>
      <CustomButton onClick={incrementNumber}>Increment</CustomButton>
      <CustomButton onClick={pushToArray}>Add Index Item to Array</CustomButton>
      {children}
      <Logger
        refCurrent={ref.current}
        number={ref.current.number}
        arrayLength={ref.current.array.length}
      />
    </>
  )
}

export default UseRefCase
