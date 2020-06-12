import { CounterResetIn } from '../../domain/usecases/CounterReset'
import { useCallback } from 'react'

export interface ResetPresenterAPI {
  reset(): Promise<void>
}

const useResetPresenter: (
  counterResetIn: CounterResetIn,
  updateUI: any
) => ResetPresenterAPI = (counterResetIn: CounterResetIn, updateUI: any) => {
  const handleReset = useCallback(async (): Promise<void> => {
    try {
      await counterResetIn.reset()
      updateUI(0)
    } catch (error) {
      console.error(error)
    }
  }, [counterResetIn, updateUI])

  const api: ResetPresenterAPI = {
    reset: handleReset
  }

  return api
}

export default useResetPresenter
