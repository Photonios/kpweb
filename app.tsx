import React from "react";

import { createSession, listEntries } from "./http";
import PasswordForm from "./passwordForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const onSubmit = ({ password }) => {
    createSession({ password }).then((success) => {
      if (success) {
        setIsLoggedIn(true);
        listEntries().then((entries) => {
          console.log("ENTRIES", entries);
        });
      } else {
        setErrorMessage("Bad password");
      }
    });
  };

  if (!isLoggedIn) {
    return <PasswordForm onSubmit={onSubmit} errorMessage={errorMessage} />;
  }

  return <strong>yeey, welcome</strong>;
};

export default App;
