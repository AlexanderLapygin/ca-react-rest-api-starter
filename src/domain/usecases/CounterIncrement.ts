import { Counter } from '../entities'

export interface CounterIncrementIn {
  getCounter(): Promise<number>
  increment(): Promise<number>
}

export interface CounterIncrementOut {
  getCounter(): Promise<Counter>
  updateCounter(counter: Counter): Promise<Counter>
}

export class CounterIncrement implements CounterIncrementIn {
  constructor(private counterUseCaseOut: CounterIncrementOut) {}

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
