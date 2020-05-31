import { useState, useCallback, useEffect } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'
import { CounterResetIn } from '../../domain/usecases/CounterReset'

export const useCounterPresenter = (
  counterIncrementIn: CounterIncrementIn,
  counterResetIn: CounterResetIn
) => {
  const [counter, setCounter] = useState<number>()

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const newCounter: number = await counterIncrementIn.getCounter()
        setCounter(newCounter)
      } catch (error) {
        console.error(error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIncrement = useCallback(async (): Promise<void> => {
    try {
      const newCounter: number = await counterIncrementIn.increment()
      setCounter(newCounter)
    } catch (error) {
      console.error(error)
    }
  }, [counterIncrementIn])

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
    increment: handleIncrement,
    reset: handleReset
  }

  return [state, api]
}

export default useCounterPresenter
