import { CounterResetIn } from '../../domain/usecases/CounterReset'
import { useCallback } from 'react'

export const useResetPresenter = (
  counterResetIn: CounterResetIn,
  updateUI: any
) => {
  const handleReset = useCallback(async (): Promise<void> => {
    try {
      await counterResetIn.reset()
      updateUI(0)
    } catch (error) {
      console.error(error)
    }
  }, [counterResetIn, updateUI])

  const api = {
    reset: handleReset
  }

  return api
}

export default useResetPresenter
