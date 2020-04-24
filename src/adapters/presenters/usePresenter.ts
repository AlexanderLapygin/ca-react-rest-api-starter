import { useState, useCallback, useEffect } from 'react'
import { CounterUseCaseIn } from '../../domain/usecases'

export const usePresenter = (counterUseCaseIn: CounterUseCaseIn) => {
  const [counter, setCounter] = useState<number>()

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const newCounter: number = await counterUseCaseIn.getCounter()
        setCounter(newCounter)
      } catch (error) {
        console.error(error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIncrement = useCallback(async (): Promise<void> => {
    try {
      const newCounter: number = await counterUseCaseIn.increment()
      setCounter(newCounter)
    } catch (error) {
      console.error(error)
    }
  }, [counterUseCaseIn])

  return {
    state: {
      counter
    },
    functions: {
      increment: handleIncrement
    }
  }
}

export default usePresenter
