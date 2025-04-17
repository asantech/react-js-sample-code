import { useState, useEffect, useRef } from "react"

type CounterProps = {
  initialCount: number
  label?: string
}

function Counter({ initialCount, label }: Readonly<CounterProps>) {
  const [count, setCount] = useState(initialCount)

  const countSetTimeoutIdRef = useRef<any>()

  useEffect(() => {
    return () => {
      clearTimeout(countSetTimeoutIdRef.current)
    }
  }, [])

  useEffect(() => {
    clearTimeout(countSetTimeoutIdRef.current)
    if (count === 0) return
    countSetTimeoutIdRef.current = setTimeout(() => {
      setCount((count) => count - 1)
    }, 1000)
  }, [count])

  return (
    <div className="inline-block p-5 w-max min-h-10 bg-sky-100 rounded border-2 border-dashed border-sky-200">
      {label && <div className="text-lg font-semi-bold">{label}</div>}
      <div className="text-lg font-bold">{count}</div>
    </div>
  )
}

export default Counter
