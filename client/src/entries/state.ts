import { selector, selectorFamily } from 'recoil';

import { listEntries, revealEntryPassword } from '../api';

export const entriesState = selector({
  key: 'entries',
  get: listEntries,
});

export const entryPassword = selectorFamily({
  key: 'entryPassword',
  get: (entryID) => async () => await revealEntryPassword(entryID),
});
