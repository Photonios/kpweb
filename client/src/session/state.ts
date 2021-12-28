import { atom } from "recoil";

export const hasSessionState = atom({
  key: "hasSession",
  // TODO: do not hard-code cookie name
  default: document.cookie.includes("kpweb_session_active=1"),
});
