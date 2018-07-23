import Client from '../../src/gatecoin-ts-client';

describe('E2E test', () => {
  it('works if true is truthy', () => {
    const client = new Client(process.env.TEST_VAR as string);
    expect(client.getVar()).toEqual("omg")
  })
});
