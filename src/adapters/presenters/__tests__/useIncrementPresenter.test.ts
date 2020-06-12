import { renderHook, act } from '@testing-library/react-hooks'
import { CounterIncrementIn } from '../../../domain/usecases'
import useIncrementPresenter from '../useIncrementPresenter'

describe('useIncrementPresenter', () => {
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

  it('should return right counter value in the first element', async () => {
    let _result = {}
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const { result } = await renderHook(() =>
        useIncrementPresenter(new CounterIncrementInMock())
      )
      _result = result
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(_result.current[0].counter).toBe(COUNTER_VALUE)
  })

  it('should return increment and updateUI functions in the second and third array element', async () => {
    let _result = {}
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const { result } = await renderHook(() =>
        useIncrementPresenter(new CounterIncrementInMock())
      )
      _result = result
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(_result.current[0].counter).toBe(COUNTER_VALUE)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(typeof _result.current[1].increment).toBe('function')
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(typeof _result.current[1].updateUI).toBe('function')
  })

  it('should increment...', async () => {
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const { result } = await renderHook(() =>
        useIncrementPresenter(new CounterIncrementInMock())
      )
      await result.current[1].increment()
      expect(result.current[0].counter).toBe(COUNTER_VALUE + 1)
    })
  })

  it('should print error on increment error', () => {
    class CounterIncrementInErrorMock implements CounterIncrementIn {
      getCounter(): Promise<number> {
        return Promise.resolve(0)
      }

      increment(): Promise<number> {
        throw new Error()
      }
    }

    const spy = jest.spyOn(global.console, 'error')

    const { result } = renderHook(() =>
      useIncrementPresenter(new CounterIncrementInErrorMock())
    )

    act(() => {
      result.current[1].increment()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it('should print error on getCounter error', () => {
    class CounterIncrementInErrorMock implements CounterIncrementIn {
      getCounter(): Promise<number> {
        throw new Error()
      }

      increment(): Promise<number> {
        return Promise.resolve(0) // any number
      }
    }

    const spy = jest.spyOn(global.console, 'error')

    renderHook(() => useIncrementPresenter(new CounterIncrementInErrorMock()))

    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
