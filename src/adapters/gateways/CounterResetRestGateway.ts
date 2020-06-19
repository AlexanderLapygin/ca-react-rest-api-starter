import { CounterResetOut } from '../../domain/usecases/CounterReset'
import fetch from 'cross-fetch'

export class CounterResetRestGateway implements CounterResetOut {
  constructor(private readonly endpoint: string) {}

  async saveReset(): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(this._createUrl(`/counter/1`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          counter: 0,
          id: 1
        })
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (error) {
      throw error
    }
  }

  private _createUrl(resource: string): string {
    return this.endpoint + resource
  }
}
