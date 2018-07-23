import Client from '../../src/gatecoin-ts-client';

describe('E2E test', () => {
  it('works if true is truthy', () => {
    const env = (window as any).__env__;
    const client = new Client(env.TEST_VAR as string);
    expect(client.getVar()).toEqual("omg")
  })
});
