const envalid = require('envalid');

const { str } = envalid;

const env = envalid.cleanEnv(process.env, {
  BASE_URL: str(),
  PUBLIC_KEY: str(),
  PRIVATE_KEY: str(),
});

process.env = env;
