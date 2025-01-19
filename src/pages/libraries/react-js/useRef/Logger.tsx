type LoggerProps = {
  refCurrent: any
  number: number
  arrayLength: number
}

const Logger = ({ refCurrent, number, arrayLength }: LoggerProps) => {
  return (
    <div>
      <h5 className='font-semibold mb-2'>Logger</h5>
      <div>
        <span>Number: </span>
        {number}
      </div>
      <div>
        <span>refCurrent.number: </span>
        {refCurrent.number}
      </div>
      <div>
        <span>arrayLength: </span>
        {arrayLength}
      </div>
    </div>
  )
}

export default Logger
