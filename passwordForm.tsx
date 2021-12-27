import React from "react";

interface Props {
  onSubmit: ({ password: string }) => void;
}

const PasswordForm = ({ onSubmit }: Props) => {
  const [password, setPassword] = React.useState("");

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
    </form>
  );
};

export default PasswordForm;
