import React from 'react';
import { useSetRecoilState } from 'recoil';

import { LoginForm } from '@kpweb/ui';
import { createSession } from '@kpweb/api';

import { hasSessionState } from './state';

const LoginScreen = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const setHasSession = useSetRecoilState(hasSessionState);

  const onSubmit = async ({ password }: { password: string }) => {
    setError(null);

    try {
      await createSession({ password });
      setHasSession(true);
    } catch (err) {
      setError(err as Error);
      setHasSession(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} error={error} />;
};

export default LoginScreen;
