import { useState, useEffect, useCallback } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'

export interface IncrementPresenterAPI {
  increment(): Promise<void>
  updateUI(counter: number): void
}

export type useIncrementPresenterType = (
  counterIncrementIn: CounterIncrementIn,
  initialValue: number
) => [{ counter: number | undefined }, IncrementPresenterAPI]

export const useIncrementPresenter = (
  counterIncrementIn: CounterIncrementIn,
  initialValue = 0
): [{ counter: number | undefined }, IncrementPresenterAPI] => {
  const [counter, setCounter] = useState<number>(initialValue)

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const newCounter: number = await counterIncrementIn.getCounter()
        setCounter(newCounter)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [counterIncrementIn])

  const handleIncrement = useCallback(async (): Promise<void> => {
    try {
      const newCounter: number = await counterIncrementIn.increment()
      setCounter(newCounter)
    } catch (error) {
      console.error(error)
    }
  }, [counterIncrementIn])

  const state = {
    counter
  }

  const api: IncrementPresenterAPI = {
    increment: handleIncrement,
    updateUI: setCounter
  }

  return [state, api]
}

export default useIncrementPresenter
