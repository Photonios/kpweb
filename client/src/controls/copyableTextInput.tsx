import React from 'react';
import { Pane, TextInput, IconButton, ClipboardIcon } from 'evergreen-ui';

type Props = React.ComponentProps<typeof TextInput>;

const CopyableTextInput = ({ value, ...props }: Props) => (
  <Pane display="flex" alignItems="center">
    <TextInput value={value} {...props} />
    <IconButton
      icon={<ClipboardIcon color="muted" size={20} />}
      onClick={() => navigator.clipboard.writeText(value)}
    />
  </Pane>
);

export default CopyableTextInput;
