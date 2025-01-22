import { useDebugValue, useState } from 'react'

function UseDebuggedCase1() {
  const [isOnline] = useState(false)
  useDebugValue(isOnline ? 'Online' : 'Offline')
  return <p className='mb-4'>See in dev tools</p>
}

export default UseDebuggedCase1
