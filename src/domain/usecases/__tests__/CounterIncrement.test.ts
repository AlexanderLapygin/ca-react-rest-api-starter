import { Counter } from '../../entities'
import { AdapterFactory } from '../../../adapters'

describe('CounterIncrement', () => {
  const COUNTER_VALUE = 99
  const SOME_COUNTER = new Counter(-1)
  describe('CounterIncrementIn', () => {
    let useCaseFactory: AdapterFactory
    beforeAll(() => {
      useCaseFactory = new AdapterFactory()
    })
    describe('getCounter()', () => {
      it('should return right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterIncrementOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))
        expect(await useCaseFactory.getCounterIncrementIn().getCounter()).toBe(
          COUNTER_VALUE
        )

        getCounterSpy.mockRestore()
      })
    })

    describe('increment()', () => {
      it('should call updateCounter with right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterIncrementOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))

        const updateCounterSpy = jest
          .spyOn(useCaseFactory.getCounterIncrementOut(), 'updateCounter')
          .mockResolvedValue(SOME_COUNTER)

        await useCaseFactory.getCounterIncrementIn().increment()

        expect(updateCounterSpy).toHaveBeenCalledTimes(1)
        expect(updateCounterSpy).toHaveBeenCalledWith(
          new Counter(COUNTER_VALUE + 1)
        )

        getCounterSpy.mockRestore()
        updateCounterSpy.mockRestore()
      })
      it('should return right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterIncrementOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))

        const updateCounterSpy = jest
          .spyOn(useCaseFactory.getCounterIncrementOut(), 'updateCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE + 1))

        expect(
          await useCaseFactory.getCounterIncrementIn().increment()
        ).toEqual(COUNTER_VALUE + 1)

        getCounterSpy.mockRestore()
        updateCounterSpy.mockRestore()
      })
    })
  })
})
