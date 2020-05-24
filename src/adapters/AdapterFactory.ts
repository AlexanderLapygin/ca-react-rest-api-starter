import {
  CounterIncrement,
  CounterIncrementIn,
  CounterIncrementOut
} from '../domain/usecases'

import {
  CounterReset,
  CounterResetIn,
  CounterResetOut
} from '../domain/usecases/CounterReset'

import { CounterResetRestGateway, CounterRestGateway } from './gateways'

export class AdapterFactory {
  private readonly counterIncrementIn: CounterIncrementIn
  private readonly counterIncrementOut: CounterRestGateway

  private readonly counterResetIn: CounterResetIn
  private readonly counterResetOut: CounterResetRestGateway

  constructor() {
    this.counterIncrementOut = new CounterRestGateway(
      `${process.env.REACT_APP_API_URL}`
    )
    this.counterIncrementIn = new CounterIncrement(this.counterIncrementOut)

    this.counterResetOut = new CounterResetRestGateway(
      `${process.env.REACT_APP_API_URL}`
    )
    this.counterResetIn = new CounterReset(this.counterResetOut)
  }

  getCounterIncrementIn(): CounterIncrementIn {
    return this.counterIncrementIn
  }

  getCounterIncrementOut(): CounterIncrementOut {
    return this.counterIncrementOut
  }

  getCounterResetIn(): CounterResetIn {
    return this.counterResetIn
  }

  getCounterResetOut(): CounterResetOut {
    return this.counterResetOut
  }
}
