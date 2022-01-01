import React from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { EntryList, LoadingPane } from '@kpweb/ui';
import { revealPassword } from '@kpweb/api';

import { entriesState } from './state';

const StatefulEntryList = () => {
  const entries = useRecoilValue(entriesState);

  return <EntryList entries={entries} onRevealPassword={revealPassword} />;
};

const EntriesScreen = () => (
  <ErrorBoundary fallback={<div>Oh shit!</div>}>
    <React.Suspense fallback={<LoadingPane />}>
      <StatefulEntryList />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
