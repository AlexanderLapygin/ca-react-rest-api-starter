import { useState, useEffect } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'

export const usePresenter = (counterIncrementIn: CounterIncrementIn) => {
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
    increment: handleIncrement
  }

  return [state, api]
}

export default usePresenter
