import { renderHook, act } from '@testing-library/react-hooks'
import { useCounterPresenter } from '../useCounterPresenter'

describe('useCounterPresenter', () => {
  const COUNTER_VALUE = 99

  it('should return state.counter and increment function', async () => {
    let _result: any = {}
    await act(async () => {
      const { result } = await renderHook(() =>
        useCounterPresenter(COUNTER_VALUE)
      )
      _result = result
    })
    expect(_result.current[0].counter).toBe(COUNTER_VALUE)
    expect(typeof _result.current[1].increment).toBe('function')
  })

  it('should have reset function', async () => {
    let _result: any = {}
    await act(async () => {
      const { result } = await renderHook(() => useCounterPresenter())
      _result = result
    })
    expect(typeof _result.current[1].reset).toBe('function')
  })

  it('should increment...', async () => {
    const { result } = renderHook(() => useCounterPresenter())

    let _result: any = {}
    await act(async () => {
      await result.current[1].increment()
      _result = result
    })
    expect(_result.current[0].counter).toBe(COUNTER_VALUE + 1)
  })

  it('should reset...', async () => {
    const { result } = renderHook(() => useCounterPresenter())

    let _result: any = {}
    await act(async () => {
      await result.current[1].reset()
      _result = result
    })
    expect(_result.current[0].counter).toBe(0)
  })
})
