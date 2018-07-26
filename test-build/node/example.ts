import '../env';
import Client from "gatecoin-ts-client-dev";

const main = async () => {
  const client = new Client({
    baseUrl: process.env.E2E_TEST_URL as string,
    publicKey: process.env.E2E_TEST_PUBLIC_KEY as string,
    privateKey: process.env.E2E_TEST_PRIVATE_KEY as string,
  });

  const response = await client.getOrderBook('BTCEUR');
  console.log(response);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
