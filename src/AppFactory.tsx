import React, { createContext } from 'react'
import usePresenter from './adapters/presenters/usePresenter'
import App from './ui/App'
import { AdapterFactory } from './adapters'

interface ContextProps {
  counterPresenter: any
}

export const AppContext = createContext({} as ContextProps)

const adapterFactory = new AdapterFactory()

export const AppFactory = (): JSX.Element => {
  const counterPresenter = usePresenter(adapterFactory.getCounterUseCaseIn())
  return (
    <AppContext.Provider value={{ counterPresenter }}>
      <App />
    </AppContext.Provider>
  )
}
