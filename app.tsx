import React from "react";

import PasswordForm from "./passwordForm";

const App = () => {
  const onSubmit = ({ password }) => {
    console.log("submitted", password);
  };

  return <PasswordForm onSubmit={onSubmit} />;
};

export default App;
