export interface CounterResetIn {
  reset(): Promise<void>
}

export interface CounterResetOut {
  saveReset(): Promise<void>
}

export class CounterReset implements CounterResetIn {
  constructor(private counterResetOut: CounterResetOut) {}

  reset(): Promise<void> {
    return this.counterResetOut.saveReset()
  }
}
