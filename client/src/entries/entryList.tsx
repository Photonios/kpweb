import React from 'react';

import Entry from './entry';
import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const EntryList = ({ entries }: Props) => (
  <div>
    {entries.map((entry) => (
      <Entry key={entry.id} entry={entry} />
    ))}
  </div>
);

export default EntryList;
