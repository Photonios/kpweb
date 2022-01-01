import { atom, selector } from 'recoil';
import { listEntries } from '@kpweb/api';

export const hasSessionState = atom({
  key: 'hasSession',
  // TODO: do not hard-code cookie name
  default: document.cookie.includes('kpweb_session_active=1'),
});

export const entriesState = selector({
  key: 'entries',
  get: listEntries,
});
