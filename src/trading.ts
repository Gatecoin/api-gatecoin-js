import {Limit} from './model';

const filterLimits = (limits: Array<Limit>, total?: number, volume?: number) => {
  let result = [];

  let currentTotal = 0;
  let currentVolume = 0;
  for (let i in limits) {
    const limit = limits[i];

    if (currentTotal === total || (volume && currentVolume + limit.volume > volume)) {
      return result;
    }

    result.push(limit);
    currentTotal++;
    currentVolume += limit.volume;
  }

  return result;
};

export {
  filterLimits,
}
