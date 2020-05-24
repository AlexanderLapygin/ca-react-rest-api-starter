export interface CounterResetIn {
  reset(): Promise<void>
}

export interface CounterResetOut {
  resetCounter(): Promise<void>
}

export class CounterReset implements CounterResetIn {
  constructor(private counterResetOut: CounterResetOut) {}

  reset(): Promise<void> {
    return this.counterResetOut.resetCounter()
  }
}
