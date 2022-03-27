import React from 'react';
import { Heading, Pane, Paragraph, majorScale } from 'evergreen-ui';
import { EntryDTO } from '@kpweb/taxonomies';

import EntryTags from './entryTags';
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
        <Heading size={600}>{entry.data.name}</Heading>
        {!!entryPath?.length && (
          <Paragraph size={400} color="muted">
            {entryPath}
          </Paragraph>
        )}
        {!!entry.data.tags?.length && (
          <Pane marginTop={majorScale(1) / 2}>
            <EntryTags tags={entry.data.tags} />
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};

export default EntrySheetHeader;
