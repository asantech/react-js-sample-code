import { PropsWithChildren } from 'react'
import clsx from 'clsx'

type SegmentProps = Readonly<
  PropsWithChildren<{
    className?: string
  }>
>

function Segment({ className, children }: SegmentProps) {
  return (
    <div
      className={clsx(
        'p-5 min-h-10 w-full rounded border-2 border-dashed border-sky-200',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Segment
