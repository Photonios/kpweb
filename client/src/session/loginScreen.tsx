import React from 'react';
import { useSetRecoilState } from 'recoil';

import { createSession } from '../api';
import { hasSessionState } from './state';
import PasswordForm from './passwordForm';
import useLoginErrorMessage from './useLoginErrorMessage';

const LoginScreen = () => {
  const setHasSession = useSetRecoilState(hasSessionState);
  const [error, setError] = React.useState(null);
  const errorMessage = useLoginErrorMessage(error);

  const onSubmit = async ({ password }) => {
    setError(null);

    try {
      await createSession({ password });
      setHasSession(true);
    } catch (err) {
      setError(err);
      setHasSession(false);
    }
  };

  return <PasswordForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default LoginScreen;
