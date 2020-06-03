import { adapterFactory } from '../../AppFactory'
import useIncrementPresenter from './useIncrementPresenter'
import useResetPresenter from './useResetPresenter'

export const useCounterPresenter = (initialValue = 0) => {
  const [state, incrementAPI] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn(),
    initialValue
  )

  const resetAPI = useResetPresenter(
    adapterFactory.getCounterResetIn(),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    incrementAPI.updateUI
  )

  const api = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    increment: incrementAPI.increment,
    reset: resetAPI.reset
  }

  return [state, api]
}

export default useCounterPresenter
