// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { CounterResetIn } from '../../../domain/usecases'
import { renderHook, act } from '@testing-library/react-hooks'
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

  it('should return reset function', () => {
    const { result } = renderHook(() =>
      useResetPresenter(new CounterResetInMock(), null)
    )

    expect(typeof result.current.reset).toBe('function')
  })

  it('should call updateUI on reset method call', async () => {
    const updateUI = () => {
      console.info('useResetPresenter.test: updateUI done')
    }

    const spy = jest.spyOn(global.console, 'info')

    await act(async () => {
      const { result } = await renderHook(() =>
        useResetPresenter(new CounterResetInMock(), updateUI)
      )

      result.current.reset()
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should print error', () => {
    class CounterResetInErrorMock implements CounterResetIn {
      reset(): Promise<void> {
        throw new Error()
      }
    }

    const { result } = renderHook(() =>
      useResetPresenter(new CounterResetInErrorMock(), null)
    )

    const spy = jest.spyOn(global.console, 'error')

    act(async () => {
      await result.current.reset()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
