import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'whatwg-fetch';

import Client from "gatecoin-api-v1";

const main = async () => {
  const client = new Client({
    baseUrl: process.env.BASE_URL as string,
    credentials: {
      publicKey: process.env.PUBLIC_KEY as string,
      privateKey: process.env.PRIVATE_KEY as string,
    }
  });

  const response = await client.getOrderBook('BTCEUR');
  console.log(response);
};

main();
