import {orderBookLeg} from '../src/utils';
import {Way} from '../src/model';

describe('orderBookLeg()', () => {
  const orderBook = {
    asks: [
      {price: 10, volume: 1},
      {price: 10, volume: 10},
      {price: 100, volume: 10},
      {price: 200, volume: 10},
    ],
    bids: [
      {price: 10, volume: 10},
      {price: 10, volume: 10},
      {price: 10, volume: 10},
    ]
  };

  it('returns the buy leg of the order book', () => {
    expect(orderBookLeg(orderBook, 2, Way.Bid)).toEqual(2);
    expect(orderBookLeg(orderBook, 12, Way.Bid)).toEqual(30);
    expect(orderBookLeg(orderBook, 40, Way.Bid)).toEqual(320);
  });
});
