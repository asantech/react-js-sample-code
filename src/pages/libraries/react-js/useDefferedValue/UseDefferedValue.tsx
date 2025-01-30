import Segment from '@components/common/segments/Segment'
import UseDefferedValueCase1 from './UseDefferedValueCase1'
import UseDefferedValueCase2 from './UseDefferedValueCase2'

function UseDefferedValue() {
  return (
    <>
      <div className='mb-3'>
        <span className='font-bold text-gray-800'>React JS - </span>
        <span className='font-bold text-gray-800'>Built In Hooks - </span>
        <span className='font-semibold text-gray-800'>useDefferedValue</span>
      </div>
      <Segment className='mb-5'>
        <UseDefferedValueCase1 />
      </Segment>
      <Segment className='mb-5'>
        <UseDefferedValueCase2 />
      </Segment>
    </>
  )
}

export default UseDefferedValue
