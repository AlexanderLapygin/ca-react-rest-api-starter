import { useState, useCallback, useEffect } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'

export const useIncrementPresenter = (
  counterIncrementIn: CounterIncrementIn
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

  return {
    state: {
      counter
    },
    functions: {
      increment: handleIncrement
    }
  }
}

export default useIncrementPresenter
