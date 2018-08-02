import {OrderBook, Way} from './model';

// @todo: export
// @todo: example
const orderBookLeg = (orderBook: OrderBook, volume: number, way: Way): number => {
  const limits = (way === Way.Ask) ? orderBook.bids : orderBook.asks;

  let currentVolume = 0;
  let result = 0;
  for (let i in limits) {
    const limit = limits[i];

    const limitVolume = Math.min(limit.volume, volume - currentVolume);
    result += limit.price / limit.volume * limitVolume;
    currentVolume += limitVolume;

    if (currentVolume === volume) {
      return result;
    }
  }

  return result;
};

export {
  orderBookLeg
}
