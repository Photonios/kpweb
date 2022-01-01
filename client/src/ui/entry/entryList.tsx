import React, { ChangeEvent } from 'react';
import { SearchInput, Pane, majorScale } from 'evergreen-ui';

import { EntryDTO } from '@kpweb/taxonomies';

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
  const [selectedEntry, setSelectedEntry] = React.useState<EntryDTO | null>(
    null
  );

  return (
    <>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={majorScale(2)}
        backgroundColor="#F9FAFC"
      >
        <SearchInput
          placeholder="Type to filter..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          width="100%"
        />
      </Pane>
      <EntryTable entries={filteredEntries} onEntryClick={setSelectedEntry} />
      <EntrySheet
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onRevealPassword={onRevealPassword}
      />
    </>
  );
};

export default EntryList;
