import React from "react";
import { useRecoilValue } from "recoil";

import { hasSessionState } from "./state";
import { LoginScreen, EntriesScreen } from "./screens";

const Router = () => {
  const hasSession = useRecoilValue(hasSessionState);

  return hasSession ? <EntriesScreen /> : <LoginScreen />;
};

export default Router;
