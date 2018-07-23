const envalid = require('envalid');

const { str } = envalid;

const env = envalid.cleanEnv(process.env, {
  TEST_VAR:            str(),
});

process.env = env;
