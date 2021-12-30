import React from 'react';
import {
  Pane,
  TextInput,
  IconButton,
  ClipboardIcon,
  EyeOnIcon,
  EyeOffIcon,
} from 'evergreen-ui';

import { sendToClipboard } from '../clipboard';

type Props = Omit<React.ComponentProps<typeof TextInput>, 'type' | 'value'> & {
  onReveal: () => Promise<string>;
};

const PasswordInput = ({ onReveal, ...props }: Props) => {
  const [value, setValue] = React.useState(null);
  const [valueVisible, setValueVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const retrieve = async () => {
    if (value) {
      return value;
    }

    setIsLoading(true);
    setValue(await onReveal());
    setIsLoading(false);

    return value;
  };

  const reveal = async () => {
    await retrieve();
    setValueVisible(true);
  };

  const copy = async () => {
    const retrievedValue = await retrieve();
    navigator.clipboard.writeText(retrievedValue);

    sendToClipboard(
      retrievedValue,
      'The password was send to the clipboard. Be careful with where you paste it.'
    );
  };

  const hide = () => {
    setValueVisible(false);
  };

  return (
    <Pane display="flex" alignItems="center">
      <TextInput
        type={valueVisible ? 'text' : 'password'}
        value={value && valueVisible ? value : '***********'}
        readOnly
        disabled={isLoading}
        {...props}
      />
      <IconButton
        disabled={isLoading}
        icon={<ClipboardIcon color="muted" size={20} />}
        onClick={copy}
      />
      <IconButton
        disabled={isLoading}
        icon={
          valueVisible ? (
            <EyeOnIcon color="muted" size={20} />
          ) : (
            <EyeOffIcon color="muted" size={20} />
          )
        }
        onClick={valueVisible ? hide : reveal}
      />
    </Pane>
  );
};

export default PasswordInput;
