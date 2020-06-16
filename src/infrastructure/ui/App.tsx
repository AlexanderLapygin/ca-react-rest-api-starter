import React from 'react'
import Counter from './Counter'
import { AdapterFactory } from '../../adapters'

export const adapterFactory = new AdapterFactory()

const App = (): JSX.Element => <Counter />

export default App
