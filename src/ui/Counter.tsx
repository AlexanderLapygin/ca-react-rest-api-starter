import React from 'react'

export interface CounterProps {
  counter: number
  onClick: () => void
}

const Counter = ({ counter, onClick }: CounterProps): JSX.Element => (
  <div>
    <div data-testid="value-testid">
      {` ${counter} `}
      <button data-testid="button-testid" onClick={onClick}>+</button>
    </div>
  </div>
)

export default Counter
