import { renderHook, act } from '@testing-library/react-hooks'
import { CounterIncrementIn } from '../../../domain/usecases'
import { useIncrementPresenter } from '../useIncrementPresenter'

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
    const { result } = await renderHook(() =>
      useIncrementPresenter(new CounterIncrementInMock())
    )
    expect(result.current[0].counter).toBe(COUNTER_VALUE)
  })

  it('should return increment and updateUI functions in the second and third array element', async () => {
    let _result = {}
    await act(async () => {
      const { result } = await renderHook(() =>
        useIncrementPresenter(new CounterIncrementInMock())
      )
      _result = result
    })

    expect(_result.current[0].counter).toBe(COUNTER_VALUE)
    expect(typeof _result.current[1].increment).toBe('function')
    expect(typeof _result.current[1].updateUI).toBe('function')
  })

  it('should increment...', async () => {
    console.log('useIncrementPresenter.test.await act(async () => { BEGIN')
    const { result } = await renderHook(() => {
      console.log('useIncrementPresenter.test.await renderHook BEGIN')
      const result = useIncrementPresenter(new CounterIncrementInMock())
      console.log('useIncrementPresenter.test.await renderHook END')
      return result
    })

    let _result = {}
    console.log('useIncrementPresenter.test BEGIN')
    await act(async () => {
      console.log(
        'useIncrementPresenter.test BEFORE await result.current[1].increment()'
      )
      await result.current[1].increment()
      console.log(
        'useIncrementPresenter.test AFTER await result.current[1].increment()'
      )
      _result = result
      console.log('useIncrementPresenter.test.await act(async () => {...} END')
    })
    console.log(
      'useIncrementPresenter.test BEFORE expect(_result.current[0].counter).toBe(COUNTER_VALUE + 1)'
    )
    expect(_result.current[0].counter).toBe(COUNTER_VALUE + 1)
    console.log('useIncrementPresenter.test END')
  })

  it('should print error on increment error', async () => {
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

    await act(async () => {
      await result.current[1].increment()
    })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it('should print error on getCounter error', async () => {
    class CounterIncrementInErrorMock implements CounterIncrementIn {
      getCounter(): Promise<number> {
        throw new Error()
      }

      increment(): Promise<number> {
        return Promise.resolve(0) // any number
      }
    }

    const spy = jest.spyOn(global.console, 'error')

    const { result } = renderHook(() =>
      useIncrementPresenter(new CounterIncrementInErrorMock())
    )

    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
