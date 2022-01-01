import React from 'react';
import {
  Pane,
  TextInput,
  IconButton,
  ClipboardIcon,
  EyeOnIcon,
  EyeOffIcon,
  majorScale,
  toaster,
} from 'evergreen-ui';

import { sendToClipboard } from '../clipboard';

type Props = Omit<React.ComponentProps<typeof TextInput>, 'type' | 'value'> & {
  onReveal: () => Promise<string>;
};

const PasswordInput = ({ onReveal, ...props }: Props) => {
  const [value, setValue] = React.useState<string | null>(null);
  const [valueVisible, setValueVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const retrieve = async () => {
    if (value) {
      return value;
    }

    setIsLoading(true);

    try {
      setValue(await onReveal());
    } catch (err) {
      toaster.danger('Password retrieval failed', {
        id: 'password-retrieval-failure',
        description:
          "Retrieving the password from the server failed for some reason. More details might be found in your browser's DevTools.",
      });
    }

    setIsLoading(false);
    return value;
  };

  const reveal = async () => {
    const revealedValue = await retrieve();
    if (revealedValue === null) {
      setValueVisible(true);
    }
  };

  const copy = async () => {
    const retrievedValue = await retrieve();
    if (retrievedValue === null) {
      return;
    }

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
        marginLeft={majorScale(1)}
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
        marginLeft={majorScale(1)}
      />
    </Pane>
  );
};

export default PasswordInput;
