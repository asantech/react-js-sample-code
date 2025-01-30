import { useRef, useDeferredValue } from 'react'

function UseDefferedValueCase2() {
  return (
    <>
      <h2 className='mb-4'>Case: initial render by useDefferedValue</h2>
      <div className='grid grid-cols-2'>
        <DefferedComponent1 />
        <DefferedComponent2 />
      </div>
    </>
  )
}

export default UseDefferedValueCase2

const DefferedComponent1 = () => {
  const renderedCountRef = useRef(0)

  const deferredQuery = useDeferredValue('value')

  renderedCountRef.current++
  return (
    <div className='flex flex-col justify-between g-4'>
      <p className='mb-6'>
        If no initial value set, useDeferredValue will not defer during the
        initial render, because there’s no previous version of value that it can
        render instead.
      </p>
      <div className='w-40 rounded border-2 border-dashed border-sky-200 bg-sky-100 aspect-square p-4 cursor-pointer text-center'>
        <p>rendered count:</p>
        <p>{renderedCountRef.current}</p>
        <p>deferredQuery:</p>
        <p>{deferredQuery}</p>
      </div>
    </div>
  )
}

const DefferedComponent2 = () => {
  const renderedCountRef = useRef(0)

  const deferredQuery = useDeferredValue('value', 'initialValue')

  renderedCountRef.current++
  return (
    <div className='flex flex-col justify-between'>
      <p className='mb-6'>The "initial value" is set.</p>
      <div className='w-40 rounded border-2 border-dashed border-sky-200 bg-sky-100 aspect-square p-4 cursor-pointer text-center'>
        <p>rendered count:</p>
        <p>{renderedCountRef.current}</p>
        <p>deferredQuery:</p>
        <p>{deferredQuery}</p>
      </div>
    </div>
  )
}
