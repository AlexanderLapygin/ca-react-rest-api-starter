import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'
import React from 'react'
import useIncrementPresenter from '../presenters/useIncrementPresenter'
import useResetPresenter from '../presenters/useResetPresenter'

jest.mock('../presenters/useIncrementPresenter')
jest.mock('../presenters/useResetPresenter')

const SOME_VALUE = 99

describe('Counter()', () => {
  let incrementMock: any
  let resetMock: any

  beforeEach(() => {
    incrementMock = jest.fn()
    resetMock = jest.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useIncrementPresenter.mockReturnValue([
      SOME_VALUE,
      {
        increment: incrementMock,
        updateUI: jest.fn()
      }
    ])

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useResetPresenter.mockReturnValue({ reset: resetMock })
  })

  afterEach(() => {
    incrementMock.mockReset()
    resetMock.mockReset()
  })

  it('should call increment when click on "+" button', () => {
    const { getByTestId } = render(<Counter />)
    fireEvent.click(getByTestId('increment-button-testid'))
    expect(incrementMock).toHaveBeenCalledTimes(1)
  })

  it('should call updateUi when click on "Reset" button', () => {
    const { getByTestId } = render(<Counter />)
    fireEvent.click(getByTestId('reset-button-testid'))
    expect(resetMock).toHaveBeenCalledTimes(1)
  })

  it('should display "+" on the button', () => {
    const { getByTestId } = render(<Counter />)
    expect(getByTestId('increment-button-testid')).toHaveTextContent('+')
  })
})
