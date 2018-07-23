import DummyClass from '../gatecoin-ts-client'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new DummyClass('test')).toBeInstanceOf(DummyClass)
  })
})
