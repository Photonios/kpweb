import React from 'react';
import { SideSheet } from 'evergreen-ui';
import { EntryDataDTO } from '@kpweb/taxonomies';

import { useMediaQueryBreakpoints } from '../styling';

import EntrySheetHeader from './entrySheetHeader';
import EntrySheetContent from './entrySheetContent';

interface Props {
  entryData: EntryDataDTO | null;
  onClose: () => void;
  onRevealPassword: () => Promise<string>;
}

const EntrySheet = ({ entryData, onClose, onRevealPassword }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();

  return (
    <SideSheet
      position={breakpoints.isMedium ? 'right' : 'bottom'}
      isShown={!!entryData}
      onBeforeClose={() => {
        onClose();
        return true;
      }}
      preventBodyScrolling
      shouldCloseOnEscapePress
      shouldCloseOnOverlayClick
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      {entryData ? (
        <>
          <EntrySheetHeader entryData={entryData} />
          <EntrySheetContent
            entryData={entryData}
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
