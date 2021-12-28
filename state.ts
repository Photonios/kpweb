import { atom, selector } from "recoil";

import { listEntries } from "./http";

export const hasSessionState = atom({
  key: "hasSession",
  default: document.cookie.includes("kpweb_session_active=1"),
});

export const entriesState = selector({
  key: "entries",
  get: listEntries,
});
