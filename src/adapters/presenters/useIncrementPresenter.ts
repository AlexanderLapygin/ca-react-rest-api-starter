import { useState, useEffect, useCallback } from 'react'
import { CounterIncrementIn } from '../../domain/usecases'

export interface IncrementPresenterAPI {
  increment(): Promise<void>
  updateUI(counter: number): void
}

export const useIncrementPresenter = (
  counterIncrementIn: CounterIncrementIn
) => {
  console.log(`useIncrementPresenter BEGIN`)
  const [counter, setCounter] = useState<number>()
  console.log(`useIncrementPresenter 1: counter = ${counter}`)

  useEffect(() => {
    console.log(`useIncrementPresenter.useEffect BEGIN`)
    ;(async (): Promise<void> => {
      console.log(`useIncrementPresenter.useEffect getCounter block BEGIN`)
      try {
        console.log(
          `useIncrementPresenter.useEffect callback BEFORE const newCounter: number = await counterIncrementIn.getCounter()`
        )
        const newCounter: number = await counterIncrementIn.getCounter()
        console.log(
          `useIncrementPresenter.useEffect callback AFTER const newCounter: number = await counterIncrementIn.getCounter()`
        )
        setCounter(newCounter)
        console.log(
          `useIncrementPresenter.useEffect callback AFTER setCounter(newCounter)`
        )
      } catch (error) {
        console.error(error)
      }
      console.log(`useIncrementPresenter.useEffect getCounter block END`)
    })()
    console.log(`useIncrementPresenter.useEffect END`)
  }, [counterIncrementIn])

  const handleIncrement = useCallback(async (): Promise<void> => {
    console.log(`useIncrementPresenter.handleIncrement BEGIN`)
    try {
      console.log(
        `useIncrementPresenter.handleIncrement BEFORE const newCounter: number = await counterIncrementIn.increment()`
      )
      const newCounter: number = await counterIncrementIn.increment()
      console.log(
        `useIncrementPresenter.handleIncrement AFTER const newCounter: number = await counterIncrementIn.increment(): newCounter = ${newCounter}`
      )
      console.log(
        `useIncrementPresenter.handleIncrement BEFORE setCounter(newCounter)`
      )
      setCounter(newCounter)
      console.log(
        `useIncrementPresenter.handleIncrement AFTER setCounter(newCounter)`
      )
    } catch (error) {
      console.error(error)
    }
    console.log(`useIncrementPresenter.handleIncrement END`)
  }, [counterIncrementIn])

  const state = {
    counter
  }

  const api: IncrementPresenterAPI = {
    increment: handleIncrement,
    updateUI: setCounter
  }

  console.log(
    `useIncrementPresenter END result = ${JSON.stringify([state, api])}`
  )
  return [state, api]
}

export default useIncrementPresenter
