import Client from '../src/node-client';
import '../env';

const main = async () => {
  const client = new Client({
    baseUrl: process.env.BASE_URL,
    credentials: {
      publicKey: process.env.PUBLIC_KEY as string,
      privateKey: process.env.PRIVATE_KEY as string,
    }
  });

  // get transaction history for the BTC/EUR pair
  const response = await client.getTransactionHistory('BTCEUR');
  console.log(response);

  // get trade history for the current user
  const tradeHistoryResponse = await client.getTradeHistory({
    currencyPair: 'BTCEUR'
  });
  console.log(tradeHistoryResponse);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});

