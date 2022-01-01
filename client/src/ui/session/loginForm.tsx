import React from 'react';
import { Alert, Pane, TextInput, Button, majorScale } from 'evergreen-ui';

import useLoginErrorMessage from './useLoginErrorMessage';

interface Props {
  onSubmit: ({ password: string }) => void;
  error: Error | null;
}

const LoginForm = ({ onSubmit, error }: Props) => {
  const [password, setPassword] = React.useState('');
  const errorMessage = useLoginErrorMessage(error);

  const onFormSubmitted = (e) => {
    e.preventDefault();
    onSubmit({ password });
    return false;
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      padding={majorScale(1)}
    >
      <Pane
        is="form"
        elevation={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        width="100%"
        maxWidth={majorScale(40)}
        padding={majorScale(3)}
        onSubmit={onFormSubmitted}
      >
        {errorMessage && (
          <Alert intent="danger" marginBottom={majorScale(2)}>
            {errorMessage}
          </Alert>
        )}
        <TextInput
          type="password"
          name="password"
          placeholder="Enter your database password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
        />
        <Button appearance="primary" marginTop={majorScale(3)}>
          Log in
        </Button>
      </Pane>
    </Pane>
  );
};

export default LoginForm;
