import React from 'react';
import { Alert, Pane, TextInput, Button, majorScale } from 'evergreen-ui';

interface Props {
  onSubmit: ({ password: string }) => void;
  errorMessage?: string;
}

const PasswordForm = ({ onSubmit, errorMessage }: Props) => {
  const [password, setPassword] = React.useState('');

  const onFormSubmitted = (e) => {
    e.preventDefault();
    onSubmit({ password });
    return false;
  };

  return (
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
  );
};

export default PasswordForm;
