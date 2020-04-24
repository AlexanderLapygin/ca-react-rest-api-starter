import { CounterInteractor } from '../CounterInteractor'
import { Counter } from '../../entities'
import { AdapterFactory } from '../../../adapters'

describe('CounterUseCase', () => {
  const COUNTER_VALUE = 99
  const SOME_COUNTER = new Counter(-1)
  describe('CounterUseCaseIn', () => {
    let useCaseFactory: AdapterFactory
    beforeAll(() => {
      useCaseFactory = new AdapterFactory('someUrl')
    })
    describe('getCounter()', () => {
      it('should return right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterUseCaseOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))
        expect(await useCaseFactory.getCounterUseCaseIn().getCounter()).toBe(
          COUNTER_VALUE
        )

        getCounterSpy.mockRestore()
      })
    })

    describe('increment()', () => {
      it('should call updateCounter with right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterUseCaseOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))

        const updateCounterSpy = jest
          .spyOn(useCaseFactory.getCounterUseCaseOut(), 'updateCounter')
          .mockResolvedValue(SOME_COUNTER)

        await useCaseFactory.getCounterUseCaseIn().increment()

        expect(updateCounterSpy).toHaveBeenCalledTimes(1)
        expect(updateCounterSpy).toHaveBeenCalledWith(
          new Counter(COUNTER_VALUE + 1)
        )

        getCounterSpy.mockRestore()
        updateCounterSpy.mockRestore()
      })
      it('should return right value', async () => {
        const getCounterSpy = jest
          .spyOn(useCaseFactory.getCounterUseCaseOut(), 'getCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE))

        const updateCounterSpy = jest
          .spyOn(useCaseFactory.getCounterUseCaseOut(), 'updateCounter')
          .mockResolvedValue(new Counter(COUNTER_VALUE + 1))

        expect(await useCaseFactory.getCounterUseCaseIn().increment()).toEqual(
          COUNTER_VALUE + 1
        )

        getCounterSpy.mockRestore()
        updateCounterSpy.mockRestore()
      })
    })
  })
})
