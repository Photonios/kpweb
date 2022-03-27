import React from 'react';
import { Heading, Pane, Paragraph, majorScale } from 'evergreen-ui';
import { EntryDataDTO } from '@kpweb/taxonomies';

import EntryTags from './entryTags';
import useEntryPath from './useEntryPath';

interface Props {
  entryData: EntryDataDTO;
}

const EntrySheetHeader = ({ entryData }: Props) => {
  const entryPath = useEntryPath(entryData, { includingName: false });

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
        <Heading size={600}>{entryData.name}</Heading>
        {!!entryPath?.length && (
          <Paragraph size={400} color="muted">
            {entryPath}
          </Paragraph>
        )}
        {!!entryData.tags?.length && (
          <Pane marginTop={majorScale(1) / 2}>
            <EntryTags tags={entryData.tags} />
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};

export default EntrySheetHeader;
