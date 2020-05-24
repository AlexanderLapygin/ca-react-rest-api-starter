// import { useState, useCallback, useEffect } from 'react'
// import { CounterIncrementIn } from '../../domain/usecases'
//
// export const useResetPresenter = (counterResetIn: CounterIncrementIn) => {
//   const [counter, setCounter] = useState<number>()
//
//   useEffect(() => {
//     ;(async (): Promise<void> => {
//       try {
//         const newCounter: number = await counterResetIn..getCounter()
//         setCounter(0)
//       } catch (error) {
//         console.error(error)
//       }
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//
//   const handleIncrement = useCallback(async (): Promise<void> => {
//     try {
//       const newCounter: number = await counterResetIn.increment()
//       setCounter(newCounter)
//     } catch (error) {
//       console.error(error)
//     }
//   }, [counterResetIn])
//
//   return {
//     state: {
//       counter
//     },
//     functions: {
//       increment: handleIncrement
//     }
//   }
// }
//
// export default useResetPresenter
