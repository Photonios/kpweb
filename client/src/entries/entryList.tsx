import React from 'react';
import { Table, Text } from 'evergreen-ui';

import useMediaQuery from '../useMediaQuery';
import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const normalize = (text: string): string => text.toLowerCase().replace(' ', '');

const EntryList = ({ entries }: Props) => {
  const isLargeWindow = useMediaQuery('(min-width: 1200px)');
  const isMediumWindow = useMediaQuery('(min-width: 900px)');

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
        {isMediumWindow && (
          <Table.TextHeaderCell>Username</Table.TextHeaderCell>
        )}
        {isLargeWindow && <Table.TextHeaderCell>URL</Table.TextHeaderCell>}
      </Table.Head>
      <Table.Body height="100%">
        {filteredEntries.map((entry) => (
          <Table.Row key={entry.id} isSelectable>
            <Table.Cell>
              <Text
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                textAlign="left"
                style={{ direction: 'rtl' }}
              >
                {[...entry.path, entry.name].join(' → ')}
              </Text>
            </Table.Cell>
            {isMediumWindow && (
              <Table.TextCell>{entry.username || '-'}</Table.TextCell>
            )}
            {isLargeWindow && (
              <Table.TextCell>{entry.url || '-'}</Table.TextCell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EntryList;
