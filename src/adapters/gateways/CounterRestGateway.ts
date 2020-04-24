import fetch from 'cross-fetch'
import { CounterUseCaseOut } from '../../domain/usecases'
import { Counter } from '../../domain/entities'

export class CounterRestGateway implements CounterUseCaseOut {
  constructor(private readonly endpoint: string) {}

  public async getCounter(): Promise<Counter> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(this._createUrl('/counter'))
      if (response.ok) {
        const json = await response.json()
        return new Counter(json[0].counter)
      }
      throw new Error(response.statusText)
    } catch (error) {
      throw error
    }
  }

  public async updateCounter(newCounter: Counter): Promise<Counter> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(this._createUrl(`/counter/1`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          counter: newCounter.counter,
          id: 1
        })
      })

      if (response.ok) {
        const json = await response.json()
        return new Counter(json.counter)
      }
      throw new Error(response.statusText)
    } catch (error) {
      throw error
    }
  }

  private _createUrl(resource: string): string {
    return this.endpoint + resource
  }
}
