import React from 'react';
import { Table } from 'evergreen-ui';

import { EntryDTO } from '@kpweb/taxonomies';
import { useMediaQueryBreakpoints } from '../styling';
import EntryTableRow from './entryTableRow';

interface Props {
  entries: EntryDTO[];
  onEntryClick: (entry: EntryDTO) => void;
}

const EntryTable = ({ entries, onEntryClick }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();

  return (
    <Table>
      {!breakpoints.isSmall && (
        <Table.Head accountForScrollbar>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          {breakpoints.isMedium && (
            <Table.TextHeaderCell>Username</Table.TextHeaderCell>
          )}
          {breakpoints.isLarge && (
            <Table.TextHeaderCell>URL</Table.TextHeaderCell>
          )}
        </Table.Head>
      )}
      <Table.Body height="100%">
        {entries.map((entry) => (
          <EntryTableRow key={entry.id} entry={entry} onClick={onEntryClick} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default EntryTable;
