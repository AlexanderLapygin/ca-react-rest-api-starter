import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Counter, { CounterProps } from '../Counter'

describe('Counter()', () => {
  it('should change value according to the new props on the click - not do the increment here', () => {
    const OLD_VALUE = 5
    const NEW_VALUE = 999
    const { getByTestId, rerender } = render(
      Counter({
        counter: OLD_VALUE,
        onIncrementClick: async (): Promise<void> => {
          rerender(
            Counter({
              counter: NEW_VALUE,
              onIncrementClick: () => {},
              onResetClick: () => {}
            })
          )
          return Promise.resolve()
        },
        onResetClick: () => {}
      })
    )

    expect(getByTestId('value-testid')).toHaveTextContent(OLD_VALUE)
    fireEvent.click(getByTestId('increment-button-testid'))
    expect(getByTestId('value-testid')).toHaveTextContent(NEW_VALUE)
  })

  it('should display "Click" on the button', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const { getByTestId } = render(Counter(<CounterProps>{}))

    const buttonNode = getByTestId('increment-button-testid')
    expect(buttonNode).toHaveTextContent('+')
  })
})
