import React from 'react'
import Counter from './Counter'
import { AppFactory } from "../../AppFactory";

export const appFactory = new AppFactory()

const App = (): JSX.Element => <Counter />

export default App
