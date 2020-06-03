import { adapterFactory } from '../../AppFactory'
import useIncrementPresenter from './useIncrementPresenter'
import useResetPresenter from './useResetPresenter'

export const useCounterPresenter = (initialValue = 0) => {
  const [state, incrementAPI] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn()
  )
  const resetAPI = useResetPresenter(
    adapterFactory.getCounterResetIn(),
    incrementAPI
  )

  const api = {
    ...incrementAPI,
    ...resetAPI
  }

  return [state, api]
}

export default useCounterPresenter
