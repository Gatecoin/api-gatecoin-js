import {filterLimits} from '../src/trading';

describe('filterLimits()', () => {
  const limits = [
    {price: 10, volume: 10},
    {price: 10, volume: 10},
    {price: 10, volume: 10},
  ];

  it('returns all values if no limits apply', () => {
    expect(filterLimits(limits)).toEqual(  limits);
  });

  it ('filters by total count', () => {
    expect(filterLimits(limits, 2)).toEqual(  [
      {price: 10, volume: 10},
      {price: 10, volume: 10},
    ]);
  });

  it ('filters by total volume', () => {
    expect(filterLimits(limits, undefined, 20)).toEqual(  [
      {price: 10, volume: 10},
      {price: 10, volume: 10},
    ]);
  });

  it ('does not return more amount then requested', () => {
    expect(filterLimits(limits, undefined, 15)).toEqual(  [
      {price: 10, volume: 10},
    ]);
  });

  it ('returns the value when the first limit is hit', () => {
    expect(filterLimits(limits, 3, 15)).toEqual(  [
      {price: 10, volume: 10},
    ]);
  });
});
