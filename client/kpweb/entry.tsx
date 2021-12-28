import React from "react";

import { EntryDTO } from "./types";

interface Props {
  entry: EntryDTO;
}

const Entry = ({ entry }: Props) => (
  <div id={entry.id}>
    <span>
      ID:
      {entry.id}
    </span>
    <span>
      Name:
      {entry.name}
    </span>
    <span>
      Path:
      {entry.path}
    </span>
  </div>
);

export default Entry;
