import React from 'react';
import { Pane, FormField, majorScale, TextareaField } from 'evergreen-ui';

import { EntryDTO } from '@kpweb/taxonomies';
import { CopyableTextInput, PasswordInput } from '../controls';

interface Props {
  entry: EntryDTO;
  onRevealPassword: (entryID: string) => Promise<string>;
}

const EntrySheetContent = ({ entry, onRevealPassword }: Props) => (
  <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
    <FormField label="Username" marginBottom={majorScale(3)}>
      <CopyableTextInput value={entry.username} readOnly={true} width="100%" />
    </FormField>
    <FormField label="Password" marginBottom={majorScale(3)}>
      <PasswordInput
        onReveal={() => onRevealPassword(entry.id)}
        readOnly={true}
        width="100%"
      />
    </FormField>
    <FormField label="URL" marginBottom={majorScale(3)}>
      <CopyableTextInput value={entry.url} readOnly={true} width="100%" />
    </FormField>
    <TextareaField label="Notes" value={entry.notes} readOnly />
  </Pane>
);

export default EntrySheetContent;
