import React from 'react';
import { Table } from 'evergreen-ui';

import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const normalize = (text: string): string => text.toLowerCase().replace(' ', '');

const EntryList = ({ entries }: Props) => {
  const [query, setQuery] = React.useState('');
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  React.useEffect(() => {
    const normalizedQuery = normalize(query);
    setFilteredEntries(
      entries.filter(({ name }) => normalize(name).includes(normalizedQuery))
    );
  }, [query]);

  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell value={query} onChange={setQuery} />
        <Table.TextHeaderCell>Username</Table.TextHeaderCell>
        <Table.TextHeaderCell>URL</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height="100%">
        {filteredEntries.map((entry) => (
          <Table.Row key={entry.id} isSelectable>
            <Table.TextCell>
              {[...entry.path, entry.name].join(' → ')}
            </Table.TextCell>
            <Table.TextCell>{entry.username || '-'}</Table.TextCell>
            <Table.TextCell>{entry.url || '-'}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EntryList;
