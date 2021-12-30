import React from 'react';
import { Table, Text, Pane, majorScale } from 'evergreen-ui';

import { EntryDTO } from '../types';
import { useMediaQueryBreakpoints } from '../styling';
import EntryTags from './entryTags';
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
      <Table.Cell
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Text
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          textAlign="left"
          style={{ direction: 'rtl' }}
        >
          {entryPath}
        </Text>
        <Pane marginTop={majorScale(1) / 2}>
          <EntryTags tags={entry.tags} />
        </Pane>
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
