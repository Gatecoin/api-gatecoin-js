
// MarketDepthResponse {
//   Currency (string),
//     Asks (Array[Limit]),
//     Bids (Array[Limit]),
//     ResponseStatus (ResponseStatus)
// }
// Limit {
//   Price (double),
//     Volume (double)
// }
interface MarketDepthResponse {
  asks: Array<Limit>;
  bids: Array<Limit>;
}

interface Limit {
  price: number;
  volume: number;
}

export {
  MarketDepthResponse,
  Limit
}
