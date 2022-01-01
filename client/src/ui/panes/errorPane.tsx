import React from 'react';
import { Pane, Alert } from 'evergreen-ui';

interface Props {
  children: React.ReactNode;
}

const ErrorPane = ({ children }: Props) => (
  <Pane
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="100%"
  >
    <Alert intent="danger" title="Oh oh! Something went wrong.">
      {children}
    </Alert>
  </Pane>
);

export default ErrorPane;
