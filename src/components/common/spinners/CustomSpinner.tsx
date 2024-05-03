function CustomSpinner() {
  return (
    <div className="relative rounded-full border-2 w-5 h-5 border-solid border-white animate-spin">
      <div className="absolute rounded-full border-t-2 w-5 h-5 border-solid border-sky-200 top-0 right-0"></div>
    </div>
  )
}

export default CustomSpinner
