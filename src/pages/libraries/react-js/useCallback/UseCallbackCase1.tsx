function UseCallbackCase1() {
  return (
    <>
      <p className='mb-4'>
        The useCallback + memo won't prevent a component rerendering if there is
        a stateful value inside the component
      </p>
      <p>Here there are two image card components</p>
      <p>
        They show a border around them when clicked (get's in selected mode)
      </p>
      <p>
        in the first one the border and tick icon is added by a 'border wrapper'
        component around the 'image card' component
      </p>
      <h2>Problem:</h2>
      <p>It makes the image reload</p>
      <p>
        In the second one the 'border wrapper' component is always present but
        not displayed, the border is shown by a state the changes the display by
        SCSS module
      </p>
      <p>here the image doesn't reload when 'image card' is selected</p>
    </>
  )
}

export default UseCallbackCase1
