import { Counter } from '../../entities'
import { AdapterFactory } from '../../../adapters'

describe('CounterReset', () => {
  const COUNTER_VALUE = 99
  const SOME_COUNTER = new Counter(-1)
  describe('CounterResetIn', () => {
    let useCaseFactory: AdapterFactory
    beforeAll(() => {
      useCaseFactory = new AdapterFactory()
    })

    describe('reset()', () => {
      it('should call reset', async () => {
        const resetCounterSpy = jest.spyOn(
          useCaseFactory.getCounterResetOut(),
          'saveReset'
        )

        await useCaseFactory.getCounterResetIn().reset()

        expect(resetCounterSpy).toHaveBeenCalledTimes(1)

        resetCounterSpy.mockRestore()
      })
    })
  })
})
