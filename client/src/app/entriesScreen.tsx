import React from 'react';
import { EntryDTO } from '@kpweb/taxonomies';
import { Pane, majorScale } from 'evergreen-ui';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { HeaderContainer } from '@kpweb/ui/navigation';
import { LoadingPane, ErrorPane } from '@kpweb/ui/panes';
import { LogoutButton } from '@kpweb/ui/session';
import { StretchedSearchInput } from '@kpweb/ui/controls';
import { EntryTable, EntrySheet, useFilteredEntries } from '@kpweb/ui/entry';
import { revealPassword } from '@kpweb/api';

import { entriesState } from './state';
import useLogout from './useLogout';

const StatefulEntryList = () => {
  const logout = useLogout();
  const entries = useRecoilValue(entriesState);

  const [query, setQuery] = React.useState('');
  const filteredEntries = useFilteredEntries(entries, query);
  const [selectedEntry, setSelectedEntry] = React.useState<EntryDTO | null>(
    null
  );

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
  <ErrorBoundary
    fallback={
      <ErrorPane>
        We weren't able to load the entries. Check your browser's development
        tools and the server logs to see what's wrong.
      </ErrorPane>
    }
  >
    <React.Suspense fallback={<LoadingPane />}>
      <StatefulEntryList />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
