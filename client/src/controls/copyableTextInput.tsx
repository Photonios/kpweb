import React from 'react';
import { Pane, TextInput, IconButton, ClipboardIcon } from 'evergreen-ui';

import { sendToClipboard } from '../clipboard';

type Props = React.ComponentProps<typeof TextInput>;

const CopyableTextInput = ({ value, ...props }: Props) => {
  const copyToClipboard = () =>
    sendToClipboard(value, `'${value}' was sent to the clipboard.`);

  return (
    <Pane display="flex" alignItems="center">
      <TextInput value={value} {...props} />
      <IconButton
        icon={<ClipboardIcon color="muted" size={20} />}
        onClick={copyToClipboard}
      />
    </Pane>
  );
};

export default CopyableTextInput;
