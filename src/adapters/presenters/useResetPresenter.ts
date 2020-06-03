import { useCallback } from 'react'
import { CounterResetIn } from '../../domain/usecases/CounterReset'

export const useResetPresenter = (
  counterResetIn: CounterResetIn,
  incrementAPI: any
) => {
  const handleReset = useCallback(async (): Promise<void> => {
    try {
      await counterResetIn.reset()
      incrementAPI.update(0)
    } catch (error) {
      console.error(error)
    }
  }, [counterResetIn, incrementAPI])

  const api = {
    reset: handleReset
  }

  return api
}

export default useResetPresenter
