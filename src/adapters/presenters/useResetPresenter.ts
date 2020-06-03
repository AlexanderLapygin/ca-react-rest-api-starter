import { CounterResetIn } from '../../domain/usecases/CounterReset'

export const useResetPresenter = (
  counterResetIn: CounterResetIn,
  updateUI: any
) => {
  const handleReset = async (): Promise<void> => {
    try {
      await counterResetIn.reset()
      updateUI(0)
    } catch (error) {
      console.error(error)
    }
  }

  const api = {
    reset: handleReset
  }

  return api
}

export default useResetPresenter
