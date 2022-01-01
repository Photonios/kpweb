import React from 'react';
import {
  ClipboardIcon,
  IconButton,
  Pane,
  TextInput,
  majorScale,
} from 'evergreen-ui';

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
        marginLeft={majorScale(1)}
      />
    </Pane>
  );
};

export default CopyableTextInput;
