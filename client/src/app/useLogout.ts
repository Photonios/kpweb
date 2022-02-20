import React from 'react';
import { useResetRecoilState } from 'recoil';
import { destroySession } from '@kpweb/api';

import { hasSessionState } from './state';

const useLogout = (): (() => Promise<void>) => {
  const resetHasSession = useResetRecoilState(hasSessionState);

  return React.useCallback(async () => {
    await destroySession();
    resetHasSession();
    window.location.reload();
  }, [resetHasSession]);
};

export default useLogout;
