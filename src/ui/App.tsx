// import React, { useContext } from 'react'
// import Counter from './Counter'
// import { AppContext } from '../AppFactory'
//
// const App = (): JSX.Element => {
//   const { counterPresenter } = useContext(AppContext)
//   const { state, functions } = counterPresenter
//
//   return (
//     <Counter counter={state.counter} onClick={functions.increment} />
//   )
// }
//
// export default App

import React, { useContext } from 'react'
import Counter from './Counter'
import { AppContext } from '../AppFactory'

const App = (): JSX.Element => {
  const { counterPresenter } = useContext(AppContext)
  const [state, api] = counterPresenter

  return <Counter counter={state.counter} onClick={api.increment} />
}

export default App
