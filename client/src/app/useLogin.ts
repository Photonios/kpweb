import React from 'react';
import { useSetRecoilState } from 'recoil';
import { createSession } from '@kpweb/api';
import { Credentials } from '@kpweb/taxonomies';

import { hasSessionState } from './state';

const useLogin = (): ((credentials: Credentials) => Promise<void>) => {
  const setHasSession = useSetRecoilState(hasSessionState);

  return React.useCallback(
    async (credentials: Credentials) => {
      await createSession(credentials);
      setHasSession(true);
    },
    [setHasSession]
  );
};

export default useLogin;
