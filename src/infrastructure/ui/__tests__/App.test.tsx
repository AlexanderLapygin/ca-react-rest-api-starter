import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '../App'
import useIncrementPresenter from '../../../adapters/presenters/useIncrementPresenter'
import useResetPresenter from '../../../adapters/presenters/useResetPresenter'

jest.mock('../../../adapters/presenters/useIncrementPresenter')
jest.mock('../../../adapters/presenters/useResetPresenter')

describe('App', () => {
  // Mocking Counter hooks to prevent remote fetching
  let incrementMock: any
  let resetMock: any
  let updateUiMock: any

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    incrementMock = jest.fn().mockImplementation(() => {})
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    resetMock = jest.fn().mockImplementation(() => {})
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateUiMock = jest.fn().mockImplementation(() => {})

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useIncrementPresenter.mockReturnValue([
      99,
      {
        increment: incrementMock,
        updateUI: updateUiMock
      }
    ])

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useResetPresenter.mockReturnValue({ reset: resetMock })
  })

  afterEach(() => {
    incrementMock.mockReset()
    updateUiMock.mockReset()
    resetMock.mockReset()
  })

  it('should match the snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
