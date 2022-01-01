import React from 'react';
import { LoginForm } from '@kpweb/ui/session';
import { Credentials } from '@kpweb/taxonomies';

import useLogin from './useLogin';

const LoginScreen = () => {
  const login = useLogin();
  const [error, setError] = React.useState<Error | null>(null);

  const onSubmit = async (credentials: Credentials) => {
    setError(null);

    try {
      await login(credentials);
    } catch (err) {
      setError(err as Error);
    }
  };

  return <LoginForm onSubmit={onSubmit} error={error} />;
};

export default LoginScreen;
