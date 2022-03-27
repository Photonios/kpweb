import React from 'react';
import { FormField, Pane, TextareaField, majorScale } from 'evergreen-ui';
import { EntryDTO } from '@kpweb/taxonomies';

import { CopyableTextInput, PasswordInput } from '../controls';

interface Props {
  entry: EntryDTO;
  onRevealPassword: (entryID: string) => Promise<string>;
}

const EntrySheetContent = ({ entry, onRevealPassword }: Props) => (
  <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
    <FormField label="Username" marginBottom={majorScale(3)}>
      <CopyableTextInput
        value={entry.data.username}
        readOnly={true}
        width="100%"
      />
    </FormField>
    <FormField label="Password" marginBottom={majorScale(3)}>
      <PasswordInput
        onReveal={() => onRevealPassword(entry.id)}
        readOnly={true}
        width="100%"
      />
    </FormField>
    <FormField label="URL" marginBottom={majorScale(3)}>
      <CopyableTextInput value={entry.data.url} readOnly={true} width="100%" />
    </FormField>
    <TextareaField label="Notes" value={entry.data.notes} readOnly />
  </Pane>
);

export default EntrySheetContent;
