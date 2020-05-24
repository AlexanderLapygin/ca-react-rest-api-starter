import {
  CounterIncrement,
  CounterIncrementIn,
  CounterIncrementOut
} from '../domain/usecases'
import { CounterRestGateway } from './gateways'

export class AdapterFactory {
  private readonly counterIncrementIn: CounterIncrementIn
  private readonly counterIncrementOut: CounterRestGateway

  constructor() {
    this.counterIncrementOut = new CounterRestGateway(`${process.env.REACT_APP_API_URL}`)
    this.counterIncrementIn = new CounterIncrement(this.counterIncrementOut)
  }

  getCounterUseCaseIn(): CounterIncrementIn {
    return this.counterIncrementIn
  }

  getCounterUseCaseOut(): CounterIncrementOut {
    return this.counterIncrementOut
  }
}
