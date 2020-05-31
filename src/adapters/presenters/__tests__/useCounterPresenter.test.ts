import { renderHook, act } from '@testing-library/react-hooks'
import { useCounterPresenter } from '../useCounterPresenter'
import { CounterIncrementIn, CounterResetIn } from '../../../domain/usecases'

describe('useCounterPresenter', () => {
  const COUNTER_VALUE = 99

  class CounterIncrementInMock implements CounterIncrementIn {
    private _count = COUNTER_VALUE

    getCounter(): Promise<number> {
      return Promise.resolve(this._count)
    }

    increment(): Promise<number> {
      this._count++
      return Promise.resolve(this._count)
    }
  }

  class CounterResetInMock implements CounterResetIn {
    private _count = COUNTER_VALUE

    reset(): Promise<void> {
      this._count = 0
      return Promise.resolve()
    }
  }

  it('should have state.counter and increment function', async () => {
    let _result: any = {}
    await act(async () => {
      const { result } = await renderHook(() =>
        useCounterPresenter(
          new CounterIncrementInMock(),
          new CounterResetInMock()
        )
      )
      _result = result
    })
    expect(_result.current[0].counter).toBe(COUNTER_VALUE)
    expect(typeof _result.current[1].increment).toBe('function')
  })

  it('should have reset function', async () => {
    let _result: any = {}
    await act(async () => {
      const { result } = await renderHook(() =>
        useCounterPresenter(
          new CounterIncrementInMock(),
          new CounterResetInMock()
        )
      )
      _result = result
    })
    expect(typeof _result.current[1].reset).toBe('function')
  })

  it('should increment...', async () => {
    const { result } = renderHook(() =>
      useCounterPresenter(
        new CounterIncrementInMock(),
        new CounterResetInMock()
      )
    )

    let _result: any = {}
    await act(async () => {
      await result.current[1].increment()
      _result = result
    })
    expect(_result.current[0].counter).toBe(COUNTER_VALUE + 1)
  })

  it('should reset...', async () => {
    const { result } = renderHook(() =>
      useCounterPresenter(
        new CounterIncrementInMock(),
        new CounterResetInMock()
      )
    )

    let _result: any = {}
    await act(async () => {
      await result.current[1].reset()
      _result = result
    })
    expect(_result.current[0].counter).toBe(0)
  })

  it('should print increment error', async () => {
    class CounterIncrementInErrorMock implements CounterIncrementIn {
      getCounter(): Promise<number> {
        return Promise.resolve(0)
      }

      increment(): Promise<number> {
        throw new Error()
      }
    }

    const { result } = renderHook(() =>
      useCounterPresenter(
        new CounterIncrementInErrorMock(),
        new CounterResetInMock()
      )
    )

    const spy = jest.spyOn(global.console, 'error')

    await act(async () => {
      await result.current[1].increment()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it('should print reset error', async () => {
    class CounterResetInErrorMock implements CounterResetIn {
      reset(): Promise<void> {
        throw new Error()
      }
    }

    const { result } = renderHook(() =>
      useCounterPresenter(
        new CounterIncrementInMock(),
        new CounterResetInErrorMock()
      )
    )

    const spy = jest.spyOn(global.console, 'error')

    await act(async () => {
      await result.current[1].reset()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
