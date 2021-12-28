import React from 'react';

interface Props {
  onSubmit: ({ password: string }) => void;
  errorMessage?: string;
}

const PasswordForm = ({ onSubmit, errorMessage }: Props) => {
  const [password, setPassword] = React.useState('');

  const onFormSubmitted = (e) => {
    e.preventDefault();
    onSubmit({ password });
  };

  return (
    <form onSubmit={onFormSubmitted}>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Enter</button>
      {errorMessage && <span>{errorMessage}</span>}
    </form>
  );
};

export default PasswordForm;
