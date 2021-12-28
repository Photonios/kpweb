import React from "react";
import { useRecoilValue } from "recoil";

import { entriesState } from "./state";

import EntryList from "./entryList";

const EntryListRenderer = () => {
  const entries = useRecoilValue(entriesState);

  return <EntryList entries={entries} />;
};

export default EntryListRenderer;
