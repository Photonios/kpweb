import React from 'react';
import { EntryDTO } from '@kpweb/taxonomies';
import { Pane, majorScale } from 'evergreen-ui';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { HeaderContainer } from '@kpweb/ui/navigation';
import { LoadingPane } from '@kpweb/ui/panes';
import { LogoutButton } from '@kpweb/ui/session';
import { StretchedSearchInput } from '@kpweb/ui/controls';
import { EntryTable, EntrySheet, useFilteredEntries } from '@kpweb/ui/entry';
import { revealPassword, destroySession } from '@kpweb/api';

import { entriesState } from './state';

const StatefulEntryList = () => {
  const entries = useRecoilValue(entriesState);

  const [query, setQuery] = React.useState('');
  const filteredEntries = useFilteredEntries(entries, query);
  const [selectedEntry, setSelectedEntry] = React.useState<EntryDTO | null>(
    null
  );

  const logout = () => {
    destroySession();
    window.location.reload();
  };

  return (
    <>
      <HeaderContainer>
        <StretchedSearchInput value={query} onChange={setQuery} />
        <Pane marginLeft={majorScale(2)}>
          <LogoutButton onClick={logout} />
        </Pane>
      </HeaderContainer>
      <EntryTable entries={filteredEntries} onEntryClick={setSelectedEntry} />
      <EntrySheet
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onRevealPassword={revealPassword}
      />
    </>
  );
};

const EntriesScreen = () => (
  <ErrorBoundary fallback={<div>Oh shit!</div>}>
    <React.Suspense fallback={<LoadingPane />}>
      <StatefulEntryList />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
