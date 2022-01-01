import React from 'react';
import { SearchInput, Pane, majorScale } from 'evergreen-ui';

import useFilteredEntries from './useFilteredEntries';
import EntrySheet from './entrySheet';
import EntryTable from './entryTable';

interface Props {
  entries: EntryDTO[];
  onRevealPassword: (entryID: string) => Promise<string>;
}

const EntryList = ({ entries, onRevealPassword }: Props) => {
  const [query, setQuery] = React.useState('');
  const filteredEntries = useFilteredEntries(entries, query);
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  return (
    <>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={majorScale(2)}
        backgroundColor="#F9FAFC"
        autoFocus
      >
        <SearchInput
          placeholder="Type to filter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          width="100%"
        />
      </Pane>
      <EntryTable
        entries={filteredEntries}
        query={query}
        onQuery={setQuery}
        onEntryClick={setSelectedEntry}
      />
      <EntrySheet
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onRevealPassword={onRevealPassword}
      />
    </>
  );
};

export default EntryList;
