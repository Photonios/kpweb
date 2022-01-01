import React from 'react';
import { IconButton, LockIcon } from 'evergreen-ui';

interface Props {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: Props) => (
  <IconButton
    appearance="minimal"
    icon={<LockIcon color="muted" size={20} />}
    onClick={onClick}
  />
);

export default LogoutButton;
