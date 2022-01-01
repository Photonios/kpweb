import React from 'react';
import { Pane, majorScale } from 'evergreen-ui';

interface Props {
  children: React.ReactNode;
}

const HeaderContainer = ({ children }: Props) => (
  <Pane
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding={majorScale(2)}
    backgroundColor="#F9FAFC"
  >
    {children}
  </Pane>
);

export default HeaderContainer;
