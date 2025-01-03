import * as migration_20250103_071257 from './20250103_071257';
import * as migration_20250103_073220 from './20250103_073220';

export const migrations = [
  {
    up: migration_20250103_071257.up,
    down: migration_20250103_071257.down,
    name: '20250103_071257',
  },
  {
    up: migration_20250103_073220.up,
    down: migration_20250103_073220.down,
    name: '20250103_073220'
  },
];
