import { useState, useCallback, useEffect } from 'react'
import { CounterResetIn } from '../../domain/usecases/CounterReset'

export const useResetPresenter = (counterResetIn: CounterResetIn) => {
  const [counter, setCounter] = useState<number>()

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        await counterResetIn.reset()
        setCounter(0)
      } catch (error) {
        console.error(error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = useCallback(async (): Promise<void> => {
    try {
      await counterResetIn.reset()
      setCounter(0)
    } catch (error) {
      console.error(error)
    }
  }, [counterResetIn])

  const state = {
    counter
  }

  const api = {
    reset: handleReset
  }

  return [state, api]
}

export default useResetPresenter
