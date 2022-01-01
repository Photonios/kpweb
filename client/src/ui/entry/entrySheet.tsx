import React from 'react';
import { SideSheet } from 'evergreen-ui';

import { EntryDTO } from '@kpweb/taxonomies';
import { useMediaQueryBreakpoints } from '../styling';
import EntrySheetHeader from './entrySheetHeader';
import EntrySheetContent from './entrySheetContent';

interface Props {
  entry: EntryDTO | null;
  onClose: () => void;
  onRevealPassword: (entryID: string) => Promise<string>;
}

const EntrySheet = ({ entry, onClose, onRevealPassword }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();

  return (
    <SideSheet
      position={breakpoints.isMedium ? 'right' : 'bottom'}
      isShown={!!entry}
      onBeforeClose={onClose}
      preventBodyScrolling
      shouldCloseOnEscapePress
      shouldCloseOnOverlayClick
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      {entry ? (
        <>
          <EntrySheetHeader entry={entry} />
          <EntrySheetContent
            entry={entry}
            onRevealPassword={onRevealPassword}
          />
        </>
      ) : (
        <span>placeholder</span>
      )}
    </SideSheet>
  );
};

export default EntrySheet;
