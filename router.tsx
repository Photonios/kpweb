import React from "react";
import { useRecoilValue } from "recoil";

import { hasSessionState } from "./state";
import LoginScreen from "./loginScreen";
import EntriesScreen from "./entriesScreen";

const Router = () => {
  const hasSession = useRecoilValue(hasSessionState);

  return hasSession ? <EntriesScreen /> : <LoginScreen />;
};

export default Router;
