import Segment from '@components/common/segments/Segment'
import UseCallbackCase1 from './UseCallbackCase1'

function UseCallback() {
  return (
    <>
      <div className='mb-3'>
        <span className='font-bold text-gray-800'>React JS - </span>
        <span className='font-bold text-gray-800'>Built In Hooks - </span>
        <span className='font-semibold text-gray-800'>useCallback</span>
      </div>
      <Segment className='mb-5'>
        <h3>Skip re-rendering method 1: </h3>
        <p>
          Using "useCallback" for the passed function props to child component
          with "memo" around the child component
        </p>
      </Segment>
      <Segment className='mb-5'>
        <UseCallbackCase1 />
      </Segment>
    </>
  )
}

export default UseCallback
