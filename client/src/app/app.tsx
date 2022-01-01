import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingPane, ErrorPane } from '@kpweb/ui/panes';
import { RecoilRoot } from 'recoil';

import Router from './router';

const App = () => (
  <RecoilRoot>
    <ErrorBoundary
      fallback={
        <ErrorPane>
          We weren't able to load the configuration. Check your browser's
          development tools and the server logs to see what's wrong.
        </ErrorPane>
      }
    >
      <React.Suspense fallback={<LoadingPane />}>
        <Router />
      </React.Suspense>
    </ErrorBoundary>
  </RecoilRoot>
);

export default App;
