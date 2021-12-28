import React from 'react';
import { Table } from 'evergreen-ui';

import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const EntryList = ({ entries }: Props) => (
  <Table>
    <Table.Head>
      <Table.TextHeaderCell>Name</Table.TextHeaderCell>
      <Table.TextHeaderCell>ID</Table.TextHeaderCell>
    </Table.Head>
    <Table.Body height="100%">
      {entries.map((entry) => (
        <Table.Row key={entry.id} isSelectable>
          <Table.TextCell>
            {[...entry.path, entry.name].join(' → ')}
          </Table.TextCell>
          <Table.TextCell>{entry.id}</Table.TextCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default EntryList;
