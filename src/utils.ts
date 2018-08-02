import {OrderBook, Way, Limit} from './model';

/**
 * These functions are public for the consumers of the library.
 */

const compareLimits = (a: Limit, b: Limit) => {
  const priceA = a.price / a.volume;
  const priceB = b.price / b.volume;

  if (priceA < priceB) {
    return -1;
  }

  if (priceA > priceB) {
    return 1;
  }

  return 0;
};

const orderBookLeg = (orderBook: OrderBook, volume: number, way: Way): number => {
  let limits = (way === Way.Ask) ? orderBook.bids : orderBook.asks;
  limits = limits.sort(compareLimits);

  if (way === Way.Ask) {
    limits = limits.reverse();
  }

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
