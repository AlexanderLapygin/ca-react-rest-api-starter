import {
  CounterIncrement,
  CounterIncrementIn,
  CounterUseCaseOut
} from '../domain/usecases'
import { CounterRestGateway } from './gateways'

export class AdapterFactory {
  private readonly counterUseCaseIn: CounterIncrementIn
  private readonly counterUseCaseOut: CounterRestGateway

  constructor() {
    this.counterUseCaseOut = new CounterRestGateway(`${process.env.REACT_APP_API_URL}`)
    this.counterUseCaseIn = new CounterIncrement(this.counterUseCaseOut)
  }

  getCounterUseCaseIn(): CounterIncrementIn {
    return this.counterUseCaseIn
  }

  getCounterUseCaseOut(): CounterUseCaseOut {
    return this.counterUseCaseOut
  }
}
