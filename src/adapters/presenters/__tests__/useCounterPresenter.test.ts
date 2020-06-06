import { renderHook, act } from '@testing-library/react-hooks'
import { useCounterPresenter } from '../useCounterPresenter'
import { CounterIncrementIn } from '../../../domain/usecases'

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

  //const useIncrementPresenterMock =

  it('', () => undefined)
})
