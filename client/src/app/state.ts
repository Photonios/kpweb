import { atomFamily, selector } from 'recoil';
import { listConfig, listEntries } from '@kpweb/api';
import { Config } from '@kpweb/taxonomies';

export const configState = selector<Config>({
  key: 'config',
  get: listConfig,
});

const sessionCookieState = atomFamily<boolean, Readonly<Config>>({
  key: 'sessionCookie',
  default: (config: Config) =>
    document.cookie.includes(config.sessionActiveCookieName),
  effects_UNSTABLE: (config: Config) => [
    ({ node, setSelf, getPromise }) => {
      const interval = setInterval(async () => {
        const currentValue = await getPromise(node);
        const newValue = document.cookie.includes(
          config.sessionActiveCookieName
        );

        if (newValue !== currentValue) {
          setSelf(newValue);
        }
      }, 500);

      return () => clearInterval(interval);
    },
  ],
});

export const hasSessionState = selector<boolean>({
  key: 'hasSession',
  get: ({ get }) => {
    const config = get(configState);
    return get(sessionCookieState(config));
  },
  set: ({ get, set }, value) => {
    const config = get(configState);
    set(sessionCookieState(config), value);
  },
});

export const entriesState = selector({
  key: 'entries',
  get: listEntries,
});
