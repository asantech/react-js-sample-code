import Segment from '@components/common/segments/Segment'

import UseRefCase1 from './useRef/UseRefCase1'
import UseRefCase2 from './useRef/UseRefCase2'

function UseRef() {
  return (
    <>
      <h1 className='mb-1 font-bold text-gray-700'>React JS</h1>
      <h2 className='mb-5'>Built In Hooks - useRef</h2>
      <Segment className='mb-5'>
        <UseRefCase1 />
      </Segment>
      <Segment className='mb-5'>
        <UseRefCase2 />
      </Segment>
    </>
  )
}

export default UseRef
