import { CounterResetOut } from '../../domain/usecases/CounterReset'

export class CounterResetRestGateway implements CounterResetOut {
  constructor(private readonly endpoint: string) {}

  resetCounter(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private _createUrl(resource: string): string {
    return this.endpoint + resource
  }
}
