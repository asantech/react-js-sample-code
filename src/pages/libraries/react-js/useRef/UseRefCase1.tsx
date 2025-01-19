import UseRefCase from './UseRefCase'

function UseRefCase1() {
  return (
    <>
      <p className='mb-4'>
        The primitive value prop of the ref change can't rerender child
        component when passing it as a primitive prop value
      </p>
      <p>
        1. You can use a state aside of the ref changes to make the component
        rerender, but this creates the coupling issue & the possibilty of
        forgetting to put setState after the ref value change is high & also DRY
        violation occures
      </p>
      <p className='mb-2'>
        2. You can place each ref values in a separate state, or the entire
        object inside the useState or in a useReducer, because the action for
        updating each value is different
      </p>
      <UseRefCase />
    </>
  )
}

export default UseRefCase1
