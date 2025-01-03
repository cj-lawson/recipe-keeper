import * as migration_20250103_071257 from './20250103_071257';

export const migrations = [
  {
    up: migration_20250103_071257.up,
    down: migration_20250103_071257.down,
    name: '20250103_071257',
  },
  {
    name: '20250103_073220'
  },
];
