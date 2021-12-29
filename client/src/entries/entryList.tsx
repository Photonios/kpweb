import React from 'react';
import { useRecoilValue } from 'recoil';

import { entriesState } from './state';
import useFilteredEntries from './useFilteredEntries';
import EntrySheet from './entrySheet';
import EntryTable from './entryTable';

const EntryList = () => {
  const entries = useRecoilValue(entriesState);

  const [query, setQuery] = React.useState('');
  const filteredEntries = useFilteredEntries(entries, query);
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  return (
    <>
      <EntryTable
        entries={filteredEntries}
        query={query}
        onQuery={setQuery}
        onEntryClick={setSelectedEntry}
      />
      <EntrySheet
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </>
  );
};

export default EntryList;
