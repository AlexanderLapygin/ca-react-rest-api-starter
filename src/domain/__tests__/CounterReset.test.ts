import { Counter } from '../index'
import { AppFactory } from "../../AppFactory";

describe('CounterReset', () => {
  const COUNTER_VALUE = 99
  const SOME_COUNTER = new Counter(-1)
  describe('CounterResetIn', () => {
    let useCaseFactory: AppFactory
    beforeAll(() => {
      useCaseFactory = new AppFactory()
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
