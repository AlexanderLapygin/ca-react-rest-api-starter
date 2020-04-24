import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { AppFactory } from '../../AppFactory'

describe('AppFactory', () => {
  afterEach(cleanup)
  it('Should match the snapshot', () => {
    const { asFragment } = render(<AppFactory />)
    expect(asFragment()).toMatchSnapshot()
  })
})
