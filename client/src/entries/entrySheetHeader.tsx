import React from 'react';
import { Pane, Paragraph, Heading, majorScale } from 'evergreen-ui';

import { EntryDTO } from '../types';
import useEntryPath from './useEntryPath';

interface Props {
  entry: EntryDTO;
}

const EntrySheetHeader = ({ entry }: Props) => {
  const entryPath = useEntryPath(entry, { includingName: false });

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      zIndex={1}
      flexShrink={0}
      elevation={0}
      backgroundColor="white"
    >
      <Pane padding={majorScale(2)} borderBottom="muted">
        <Heading size={600}>{entry.name}</Heading>
        <Paragraph size={400} color="muted">
          {entryPath}
        </Paragraph>
      </Pane>
    </Pane>
  );
};

export default EntrySheetHeader;
