import { atom, selector } from "recoil";

import { listEntries } from "./http";

export const hasSessionState = atom({ key: "hasSession", default: false });

export const entriesState = selector({
  key: "entries",
  get: listEntries,
});
