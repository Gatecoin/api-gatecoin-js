import Client from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.BASE_URL,
  });

  // get tickers for all currency
  const response = await client.getTickers();
  console.log(response);

};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

