const envalid = require('envalid');

const { str } = envalid;

const env = envalid.cleanEnv(process.env, {
  E2E_TEST_URL: str(),
  E2E_TEST_PUBLIC_KEY: str(),
  E2E_TEST_PRIVATE_KEY: str(),
});

process.env = env;
