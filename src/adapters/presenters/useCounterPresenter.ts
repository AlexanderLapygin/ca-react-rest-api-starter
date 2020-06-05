import { adapterFactory } from '../../AppFactory'
import { ResetPresenterAPI } from './useResetPresenter'

const useCounterPresenter = (
  initialValue = 0,
  useIncrementPresenter: any,
  useResetPresenter: any
) => {
  const [state, incrementAPI] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn(),
    initialValue
  )

  const resetAPI: ResetPresenterAPI = useResetPresenter(
    adapterFactory.getCounterResetIn(),
    incrementAPI.updateUI
  )

  const api = {
    increment: incrementAPI.increment,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    reset: resetAPI.reset
  }

  return [state, api]
}

export default useCounterPresenter
