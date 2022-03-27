import React from 'react';
import { FormField, Pane, TextareaField, majorScale } from 'evergreen-ui';
import { EntryDataDTO } from '@kpweb/taxonomies';

import { CopyableTextInput, PasswordInput } from '../controls';

interface Props {
  entryData: EntryDataDTO;
  onRevealPassword: () => Promise<string>;
}

const EntrySheetContent = ({ entryData, onRevealPassword }: Props) => (
  <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
    <FormField label="Username" marginBottom={majorScale(3)}>
      <CopyableTextInput
        value={entryData.username}
        readOnly={true}
        width="100%"
      />
    </FormField>
    <FormField label="Password" marginBottom={majorScale(3)}>
      <PasswordInput onReveal={onRevealPassword} readOnly={true} width="100%" />
    </FormField>
    <FormField label="URL" marginBottom={majorScale(3)}>
      <CopyableTextInput value={entryData.url} readOnly={true} width="100%" />
    </FormField>
    <TextareaField label="Notes" value={entryData.notes} readOnly />
  </Pane>
);

export default EntrySheetContent;
