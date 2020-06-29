import { CounterResetRestGateway } from '../CounterResetRestGateway'

describe('CounterResetOutRestGateway', () => {
  const ENDPOINT = 'endpoint'
  const ENDPOINT_URL = `http://${ENDPOINT}`
  const COUNTER_VALUE = 99
  const COUNTER_ID = 1

  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('saveReset()', () => {
    it('Should perform the /counter/id request, and only once', async () => {
      fetchMock.mockResponses([JSON.stringify([{}]), {}])

      const counterResetGateway = new CounterResetRestGateway(ENDPOINT_URL)
      await counterResetGateway.saveReset()

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${ENDPOINT_URL}/counter/${COUNTER_ID}`
      )
    })
    it('Should throw an error when status not Ok', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([{ counter: COUNTER_VALUE, id: COUNTER_ID }]),
        { status: 400 }
      )

      const counterResetGateway = new CounterResetRestGateway(ENDPOINT_URL)
      await expect(counterResetGateway.saveReset()).rejects.toThrowError()
    })
  })
})

fetchMock.disableMocks()
