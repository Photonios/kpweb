import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import EntryList from './entryList';

const EntriesScreen = () => (
  <ErrorBoundary fallback={<div>Oh shit!</div>}>
    <React.Suspense fallback={<div>Loading...</div>}>
      <EntryList />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
