import { CounterIncrementIn } from '../../domain/usecases'
import { useCallback, useEffect, useState } from 'react'

export interface IncrementPresenterAPI {
  increment(): Promise<void>
  updateUI(counter: number): void
}

const useIncrementPresenter: (
  counterIncrementIn: CounterIncrementIn
) => [{ counter: number }, IncrementPresenterAPI] = (
  counterIncrementIn: CounterIncrementIn
) => {
  const [counter, setCounter] = useState<number>(0)

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
