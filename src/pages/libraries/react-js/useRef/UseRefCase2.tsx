import { useState } from 'react'

import CustomButton from '@components/common/buttons/CustomButton'
import UseRefCase from './UseRefCase'

function UseRefCase2() {
  const [, setRender] = useState(0)

  const renderComponent = () => {
    setRender(prev => prev + 1)
  }
  return (
    <>
      <p>
        1. The values of the is being change by the event handler functions, no
        changes is shown, until the component is rerendered
      </p>
      <p>2. It is bad to just use useState setter function for rendering?</p>
      <UseRefCase>
        <CustomButton onClick={renderComponent}>Render component</CustomButton>
      </UseRefCase>
    </>
  )
}

export default UseRefCase2
