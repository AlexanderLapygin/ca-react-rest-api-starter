import React, { createContext } from 'react'
import useCounterPresenter from './adapters/presenters/useCounterPresenter'
import App from './ui/App'
import { AdapterFactory, useIncrementPresenter,  useResetPresenter } from './adapters'

interface ContextProps {
  counterPresenter: any
}

export const AppContext = createContext({} as ContextProps)

export const adapterFactory = new AdapterFactory()

export const AppFactory = (): JSX.Element => {
  const counterPresenter = useCounterPresenter(
    0,
    useIncrementPresenter,
    useResetPresenter
  )
  return (
    <AppContext.Provider value={{ counterPresenter }}>
      <App />
    </AppContext.Provider>
  )
}
