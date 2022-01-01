import { atom, selector } from 'recoil';
import { listEntries } from '@kpweb/api';

export const hasSessionState = atom({
  key: 'hasSession',
  // TODO: do not hard-code cookie name
  default: document.cookie.includes('kpweb_session_active=1'),
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const interval = setInterval(() => {
        if (document.cookie.includes('kpweb_session_active=1')) {
          setSelf(true);
        } else {
          setSelf(false);
        }
      }, 500);

      return () => clearInterval(interval);
    },
  ],
});

export const entriesState = selector({
  key: 'entries',
  get: listEntries,
});
