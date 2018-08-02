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
      {price: 20, volume: 10},
      {price: 40, volume: 10},
      {price: 80, volume: 10},
      {price: 800, volume: 1},
    ]
  };

  it('returns the buy leg of the order book', () => {
    expect(orderBookLeg(orderBook, 2, Way.Bid)).toEqual(2);
    expect(orderBookLeg(orderBook, 12, Way.Bid)).toEqual(30);
    expect(orderBookLeg(orderBook, 40, Way.Bid)).toEqual(320);
  });

  it('returns the sell leg of the order book', () => {
    expect(orderBookLeg(orderBook, 1, Way.Ask)).toEqual(800);
    expect(orderBookLeg(orderBook, 5, Way.Ask)).toEqual(832);
    expect(orderBookLeg(orderBook, 50, Way.Ask)).toEqual(940);
  });
});
