import React from 'react';

import { LoginScreen, useHasSession } from './session';
import { EntriesScreen } from './entries';

const Router = () => {
  const hasSession = useHasSession();

  return hasSession ? <EntriesScreen /> : <LoginScreen />;
};

export default Router;
