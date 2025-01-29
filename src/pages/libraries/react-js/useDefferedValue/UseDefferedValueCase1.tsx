import CustomButton from '@components/common/buttons/CustomButton'

function UseDefferedValueCase1() {
  return (
    <>
      <h1 className='mb-4'>
        Case 1: a useDeferred doesn't do first render if initial value not set
      </h1>
      This is the initial color of the component
      <div className='w-96 h-96'></div>
      <CustomButton></CustomButton>
    </>
  )
}

export default UseDefferedValueCase1

// const generateAHighCalculatedValue = () => {
//   for (let i = 0; i <= 6000000000; i++) {}
// }
