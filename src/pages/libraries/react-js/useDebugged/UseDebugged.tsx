import Segment from '@components/common/segments/Segment'

import UseDebuggedCase1 from './UseDebuggedCase1'

function UseDebugged() {
  return (
    <>
      <div className='mb-3'>
        <span className='font-bold text-gray-800'>React JS - </span>
        <span className='font-bold text-gray-800'>Built In Hooks - </span>
        <span className='font-semibold text-gray-800'>useDebbuged</span>
      </div>
      <Segment className='mb-5'>
        <h3>Skip re-rendering method 1: </h3>
        <UseDebuggedCase1 />
      </Segment>
      <Segment className='mb-5'></Segment>
    </>
  )
}

export default UseDebugged
