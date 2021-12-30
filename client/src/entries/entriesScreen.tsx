import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import EntryList from './entryList';
import LoadingPane from '../loadingPane';

const EntriesScreen = () => (
  <ErrorBoundary fallback={<div>Oh shit!</div>}>
    <React.Suspense fallback={<LoadingPane />}>
      <EntryList />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
