import React from 'react';
import { Table, Text } from 'evergreen-ui';

import { EntryDTO } from '../types';
import { useMediaQueryBreakpoints } from '../styling';
import useEntryPath from './useEntryPath';

interface Props {
  entry: EntryDTO;
  onClick: (entry: EntryDTO) => void;
}

const EntryTableRow = ({ entry, onClick }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();
  const entryPath = useEntryPath(entry, { includingName: true });

  return (
    <Table.Row isSelectable onSelect={() => onClick(entry)}>
      <Table.Cell>
        <Text
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          textAlign="left"
          style={{ direction: 'rtl' }}
        >
          {entryPath}
        </Text>
      </Table.Cell>
      {breakpoints.isMedium && (
        <Table.TextCell>{entry.username || '-'}</Table.TextCell>
      )}
      {breakpoints.isLarge && (
        <Table.TextCell>{entry.url || '-'}</Table.TextCell>
      )}
    </Table.Row>
  );
};

export default EntryTableRow;
