import Segment from '@components/common/segments/Segment'

import UseRefCase1 from '../useRef/UseRefCase1'
import UseRefCase2 from '../useRef/UseRefCase2'
import UseRefCase3 from '../useRef/UseRefCase3'

function UseRef() {
  return (
    <>
      <div className='mb-4'>
        <span className='mb-1 font-bold text-gray-700'>React JS - </span>
        <span className='mb-1 font-bold text-gray-700'>Built In Hooks - </span>
        <span className='mb-1 font-semibold text-gray-700'>useRef</span>
      </div>
      <Segment className='mb-5'>
        <UseRefCase1 />
      </Segment>
      <Segment className='mb-5'>
        <UseRefCase2 />
      </Segment>
      <Segment className='mb-5'>
        <UseRefCase3 />
      </Segment>
    </>
  )
}

export default UseRef
