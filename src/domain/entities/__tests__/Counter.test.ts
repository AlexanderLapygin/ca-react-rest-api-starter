import { Counter } from '../Counter'

describe('Counter', () => {
  it('Created with negative number should be the same', () => {
    expect(new Counter(-3).counter).toBe(-3)
  })
  it('Created with 0 should be 0', () => {
    expect(new Counter(0).counter).toBe(0)
  })
  it('Created with positive number should be the same', () => {
    expect(new Counter(5).counter).toBe(5)
  })
})
