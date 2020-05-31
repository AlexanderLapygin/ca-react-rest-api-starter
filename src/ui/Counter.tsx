import React from 'react'

export interface CounterProps {
  counter: number
  onIncrementClick: () => void
  onResetClick: () => void
}

const Counter = ({
  counter,
  onIncrementClick,
  onResetClick
}: CounterProps): JSX.Element => (
  <div>
    <div data-testid="value-testid">
      <button data-testid="reset-button-testid" onClick={onResetClick}>
        Reset
      </button>
      {` ${counter} `}
      <button data-testid="increment-button-testid" onClick={onIncrementClick}>
        +
      </button>
    </div>
  </div>
)

export default Counter
