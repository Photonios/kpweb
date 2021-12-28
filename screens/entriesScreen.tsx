import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import EntryListRenderer from "../entryListRenderer";

const EntriesScreen = () => (
  <ErrorBoundary fallback={<div>Oh shit!</div>}>
    <React.Suspense fallback={<div>Loading...</div>}>
      <EntryListRenderer />
    </React.Suspense>
  </ErrorBoundary>
);

export default EntriesScreen;
