import React from 'react';
import { Pane, Spinner } from 'evergreen-ui';

const LoadingPane = () => (
  <Pane
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="100%"
  >
    <Spinner />
  </Pane>
);

export default LoadingPane;
