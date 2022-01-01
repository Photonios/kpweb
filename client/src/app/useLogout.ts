import React from 'react';
import { destroySession } from '@kpweb/api';

const useLogout = (): (() => Promise<void>) =>
  React.useCallback(async () => {
    await destroySession();
    window.location.reload();
  }, []);

export default useLogout;
