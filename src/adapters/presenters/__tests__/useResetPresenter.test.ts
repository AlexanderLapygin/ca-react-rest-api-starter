import { renderHook, act } from '@testing-library/react-hooks'
import { CounterResetIn } from '../../../domain/usecases'
import useResetPresenter from '../useResetPresenter'

describe('useResetPresenter', () => {
  const COUNTER_VALUE = 99

  class CounterResetInMock implements CounterResetIn {
    private _count = COUNTER_VALUE

    reset(): Promise<void> {
      this._count = 0
      return Promise.resolve()
    }
  }

  it('should reset', async () => {
    const { result } = renderHook(() =>
      useResetPresenter(new CounterResetInMock(), null)
    )

    let _result: any = {}
    await act(async () => {
      await result.current[1].reset()
      _result = result
    })
    expect(_result.current[0].counter).toBe(0)
  })

  it('should print error', async () => {
    class CounterResetInErrorMock implements CounterResetIn {
      reset(): Promise<void> {
        throw new Error()
      }
    }

    const { result } = renderHook(() =>
      useResetPresenter(new CounterResetInErrorMock())
    )

    const spy = jest.spyOn(global.console, 'error')

    await act(async () => {
      await result.current[1].reset()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
