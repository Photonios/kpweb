import { selector } from 'recoil';

import { listEntries } from '../api';

export const entriesState = selector({
  key: 'entries',
  get: listEntries,
});
