import React from 'react';
import { SideSheet } from 'evergreen-ui';

import { EntryDTO } from '../types';
import { useMediaQueryBreakpoints } from '../styling';
import EntrySheetHeader from './entrySheetHeader';
import EntrySheetContent from './entrySheetContent';

interface Props {
  entry: EntryDTO | null;
  onClose: () => void;
}

const EntrySheet = ({ entry, onClose }: Props) => {
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
          <EntrySheetContent entry={entry} />{' '}
        </>
      ) : (
        <span>placeholder</span>
      )}
    </SideSheet>
  );
};

export default EntrySheet;
