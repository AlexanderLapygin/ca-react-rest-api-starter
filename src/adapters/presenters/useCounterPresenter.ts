import { adapterFactory } from '../../AppFactory'
import useIncrementPresenter from './useIncrementPresenter'
import useResetPresenter from './useResetPresenter'

export const useCounterPresenter = () => {
  const [counter, incrementAPI] = useIncrementPresenter(
    adapterFactory.getCounterIncrementIn()
  )
  const [resetCounter, resetAPI] = useResetPresenter(
    adapterFactory.getCounterResetIn()
  )

  const state = {
    counter
  }

  const api = {
    ...incrementAPI,
    ...resetAPI
  }

  return [state, api]
}

export default useCounterPresenter
