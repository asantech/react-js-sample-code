import { useState, useRef } from 'react'

function UseDefferedValueCase1() {
  return (
    <>
      <h2 className='mb-4'>
        Rendered count is one more than set render count (in non strict mode)
      </h2>
      <DefferedComponent />
    </>
  )
}

const DefferedComponent = () => {
  const renderedCountRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)

  renderedCountRef.current++
  return (
    <button
      className='rounded border-2 border-dashed border-sky-200 bg-sky-100 aspect-square p-4 cursor-pointer'
      onClick={() => {
        setRenderCount(prev => prev + 1)
      }}
    >
      <p>rendered count:</p>
      <p>{renderedCountRef.current}</p>
      <p>renderCount:</p>
      <p>{renderCount}</p>
    </button>
  )
}

export default UseDefferedValueCase1
