import { isLatLong } from 'class-validator';

export function getLonLat(location: string) {
  if (!isLatLong(location)) throw new Error('bad location format');
  const result = location
    .split(',')
    .reverse()
    .map((v) => parseFloat(v));
  if (result.length < 2) throw new Error('not enough values from location');

  return result;
}
