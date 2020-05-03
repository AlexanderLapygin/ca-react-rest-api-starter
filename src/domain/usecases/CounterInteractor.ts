import { Counter } from '../entities'

export interface CounterUseCaseIn {
  getCounter(): Promise<number>
  increment(): Promise<number>
}

export interface CounterUseCaseOut {
  getCounter(): Promise<Counter>
  updateCounter(counter: Counter): Promise<Counter>
}

export class CounterInteractor implements CounterUseCaseIn {
  constructor(private counterUseCaseOut: CounterUseCaseOut) {}

  async getCounter(): Promise<number> {
    const newCounter: Counter = await this.counterUseCaseOut.getCounter()
    return newCounter.counter
  }

  async increment(): Promise<number> {
    const currentCounter: Counter = await this.counterUseCaseOut.getCounter()
    const newCounter: Counter = new Counter(currentCounter.counter + 1)
    const resultCounter: Counter = await this.counterUseCaseOut.updateCounter(
      newCounter
    )

    return resultCounter.counter
  }
}
