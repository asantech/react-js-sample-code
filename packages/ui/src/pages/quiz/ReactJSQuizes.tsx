function ReactJSQuizes() {
  return (
    <>
      <h1 className="mb-5 text-xl font-bold">React JS Quizes</h1>
      <div>
        <div className="mr-2 inline-block">Sources</div>
      </div>
      <a
        className="inline-block my-5"
        href="https://bigfrontend.dev/react-quiz"
        target="_blank"
        rel="noreferrer"
      >
        https://bigfrontend.dev/react-quiz
      </a>
      <div>
        <h2 className="mb-2 text-xl font-semi-bold">Theoretical Questions</h2>
        <h3 className="mb-1 text-lg font-semi-bold">React JS concepts:</h3>
        <p>1. what does rendering mean in React?</p>
        <p>1. what is idempotency?</p>
      </div>
      <br />
      <div>
        <h2 className="mb-2 text-xl font-semi-bold">Usage Questions</h2>
        <h3 className="mb-1 text-lg font-semi-bold">UseEffect:</h3>
        <p>
          1. if a useEffect has a dependency, and the dependency value changes
          from undefined to a defined value, will the useEffect run for when the
          value was undefined?
        </p>
        <p>
          1.1. if there are more dependency values, what will happen in each
          case scenario?
        </p>
        <h3 className="mb-1 text-lg font-semi-bold">Rendering:</h3>
        <p>
          2. if non idempotent code line "new Date()" is used in the first layer
          of a component, will it change on each render?
        </p>
      </div>
    </>
  )
}

export default ReactJSQuizes
