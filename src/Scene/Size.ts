import { ConfettiTheme } from '../types';

export class SizeStore {
  constructor (
    public size: ConfettiTheme['size'] = {
      base: 0.6,
      variance: 0.2,
      ratio: 0.4
    }
  ) { }

  store (size: ConfettiTheme['size']) {
    this.size = size
  }
}