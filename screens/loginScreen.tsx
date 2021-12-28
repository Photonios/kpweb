import React from "react";
import { useSetRecoilState } from "recoil";

import { createSession } from "../http";
import { hasSessionState } from "../state";
import PasswordForm from "../passwordForm";

const LoginScreen = () => {
  const setHasSession = useSetRecoilState(hasSessionState);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const onSubmit = async ({ password }) => {
    setErrorMessage(null);

    try {
      await createSession({ password });
      setHasSession(true);
    } catch (err) {
      setErrorMessage(err.toString());
      setHasSession(false);
    }
  };

  return <PasswordForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default LoginScreen;
