import React from 'react'
import { appFactory } from './App'
import useResetPresenter from './presenters/useResetPresenter'
import useIncrementPresenter from './presenters/useIncrementPresenter'

const Counter = (): JSX.Element => {
  const [state, { increment, updateUI }] = useIncrementPresenter(
    appFactory.getCounterIncrementIn()
  )
  const { reset } = useResetPresenter(
    appFactory.getCounterResetIn(),
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
