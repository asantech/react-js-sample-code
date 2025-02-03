import clsx from 'clsx'

type Divider1Props = Readonly<{
  className?: string
}>

function Divider1({ className }: Divider1Props) {
  return (
    <hr
      className={clsx(
        'h-px border border-dashed border-sky-200 my-4',
        className
      )}
    />
  )
}

export default Divider1
