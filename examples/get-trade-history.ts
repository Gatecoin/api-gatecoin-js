import Client from '../src/node-client';

const main = async () => {
  const client = new Client({
    publicKey: 'your public key',
    privateKey: 'your private key',
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

main();
