import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { adapterFactory } from './App'
import useIncrementPresenter from '../adapters/presenters/useIncrementPresenter'
import useResetPresenter from '../adapters/presenters/useResetPresenter'

const Counter = (): JSX.Element => {
  const [state, { increment, updateUI }] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn()
  )
  // const { reset } = useResetPresenter(
  //   adapterFactory.getCounterResetIn(),
  //   updateUI
  // )
  const { reset } = useResetPresenter(
    adapterFactory.getCounterResetIn(),
    updateUI
  )

  return (
    <div>
      <div data-testid="value-testid">
        <button data-testid="reset-button-testid" onClick={reset}>
          Reset
        </button>
        {` ${state.counter} `}
        <button data-testid="increment-button-testid" onClick={increment}>
          +
        </button>
      </div>
    </div>
  )
}

export default Counter
