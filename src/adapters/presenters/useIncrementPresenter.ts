import { useState, useEffect } from 'react'
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
  }, [])

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

  const api = {
    increment: handleIncrement,
    update: setCounter
  }

  return [state, api]
}

export default useIncrementPresenter
