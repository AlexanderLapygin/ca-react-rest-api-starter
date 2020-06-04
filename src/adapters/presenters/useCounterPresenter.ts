import { adapterFactory } from '../../AppFactory'
import { useIncrementPresenterType } from './useIncrementPresenter'
import { ResetPresenterAPI, useResetPresenterType } from './useResetPresenter'

export const useCounterPresenter = (
  initialValue = 0,
  useIncrementPresenter: useIncrementPresenterType,
  useResetPresenter: useResetPresenterType
) => {
  const [state, incrementAPI] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn(),
    initialValue
  )

  const resetAPI: ResetPresenterAPI = useResetPresenter(
    adapterFactory.getCounterResetIn(),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    incrementAPI.updateUI
  )

  const api = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    increment: incrementAPI.increment,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    reset: resetAPI.reset
  }

  return [state, api]
}

export default useCounterPresenter
