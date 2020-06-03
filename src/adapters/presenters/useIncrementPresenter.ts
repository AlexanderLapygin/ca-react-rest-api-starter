import { useState, useEffect } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'

export interface IncrementPresenterAPI {
  increment(): Promise<void>
  updateUI(counter: number): void
}

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

  const handleIncrement = async (): Promise<void> => {
    try {
      const newCounter: number = await counterIncrementIn.increment()
      setCounter(newCounter)
    } catch (error) {
      console.error(error)
    }
  }

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
