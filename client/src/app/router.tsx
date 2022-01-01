import React from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingPane, ErrorPane } from '@kpweb/ui/panes';

import { hasSessionState } from './state';
import LoginScreen from './loginScreen';
import EntriesScreen from './entriesScreen';

const Router = () => {
  const hasSession = useRecoilValue(hasSessionState);

  if (hasSession) {
    return (
      <ErrorBoundary
        fallback={
          <ErrorPane>
            We weren't able to load the entries. Check your browser's
            development tools and the server logs to see what's wrong.
          </ErrorPane>
        }
      >
        <React.Suspense fallback={<LoadingPane />}>
          <EntriesScreen />
        </React.Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorPane>
          We weren't able to create a session. Check your browser's development
          tools and the server logs to see what's wrong.
        </ErrorPane>
      }
    >
      <React.Suspense fallback={<LoadingPane />}>
        <LoginScreen />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Router;
