import React, { createContext } from 'react'
import useCounterPresenter from './adapters/presenters/useCounterPresenter'
import App from './ui/App'
import { AdapterFactory } from './adapters'

interface ContextProps {
  counterPresenter: any
}

export const AppContext = createContext({} as ContextProps)

const adapterFactory = new AdapterFactory()

export const AppFactory = (): JSX.Element => {
  const counterPresenter = useCounterPresenter(adapterFactory.getCounterIncrementIn())
  return (
    <AppContext.Provider value={{ counterPresenter }}>
      <App />
    </AppContext.Provider>
  )
}
