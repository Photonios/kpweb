import React from 'react';
import {
  Pane,
  TextInput,
  IconButton,
  ClipboardIcon,
  EyeOnIcon,
  EyeOffIcon,
} from 'evergreen-ui';

type Props = Omit<React.ComponentProps<typeof TextInput>, 'type' | 'value'> & {
  onReveal: () => Promise<string>;
};

const PasswordInput = ({ onReveal, ...props }: Props) => {
  const [value, setValue] = React.useState(null);
  const [valueVisible, setValueVisible] = React.useState(false);

  const reveal = async () => {
    setValue(await onReveal());
    setValueVisible(true);
  };

  const copy = async () => {
    const retrievedValue = await onReveal();
    setValue(retrievedValue);
    navigator.clipboard.writeText(retrievedValue);
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
        {...props}
      />
      <IconButton
        icon={<ClipboardIcon color="muted" size={20} />}
        onClick={copy}
      />
      <IconButton
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
