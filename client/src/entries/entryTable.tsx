import React from 'react';
import { Table } from 'evergreen-ui';

import { EntryDTO } from '../types';
import { useMediaQueryBreakpoints } from '../styling';
import EntryTableRow from './entryTableRow';

interface Props {
  entries: EntryDTO[];
  query: string;
  onQuery: (query: string) => void;
  onEntryClick: (entry: EntryDTO) => void;
}

const EntryTable = ({ entries, query, onQuery, onEntryClick }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();

  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell value={query} onChange={onQuery} autoFocus />
        {breakpoints.isMedium && (
          <Table.TextHeaderCell>Username</Table.TextHeaderCell>
        )}
        {breakpoints.isLarge && (
          <Table.TextHeaderCell>URL</Table.TextHeaderCell>
        )}
      </Table.Head>
      <Table.Body height="100%">
        {entries.map((entry) => (
          <EntryTableRow key={entry.id} entry={entry} onClick={onEntryClick} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default EntryTable;
