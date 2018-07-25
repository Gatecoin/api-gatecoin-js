const envalid = require('envalid');

const { str } = envalid;

const env = envalid.cleanEnv(process.env, {
  E2E_TEST_URL: str(),
});

process.env = env;
