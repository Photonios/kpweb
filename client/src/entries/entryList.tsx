import React from 'react';
import {
  Pane,
  Table,
  Text,
  SideSheet,
  Paragraph,
  Heading,
  FormField,
  majorScale,
  TextareaField,
} from 'evergreen-ui';

import { useMediaQueryBreakpoints } from '../styling';
import { CopyableTextInput, PasswordInput } from '../controls';
import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const normalize = (text: string): string => text.toLowerCase().replace(' ', '');

const EntryList = ({ entries }: Props) => {
  const breakpoints = useMediaQueryBreakpoints();

  const [query, setQuery] = React.useState('');
  const [filteredEntries, setFilteredEntries] = React.useState(entries);
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  React.useEffect(() => {
    const normalizedQuery = normalize(query);
    setFilteredEntries(
      entries.filter(({ name }) => normalize(name).includes(normalizedQuery))
    );
  }, [query]);

  return (
    <>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell value={query} onChange={setQuery} />
          {breakpoints.isMedium && (
            <Table.TextHeaderCell>Username</Table.TextHeaderCell>
          )}
          {breakpoints.isLarge && <Table.TextHeaderCell>URL</Table.TextHeaderCell>}
        </Table.Head>
        <Table.Body height="100%">
          {filteredEntries.map((entry) => (
            <Table.Row
              key={entry.id}
              isSelectable
              onSelect={() => setSelectedEntry(entry)}
            >
              <Table.Cell>
                <Text
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textAlign="left"
                  style={{ direction: 'rtl' }}
                >
                  {[...entry.path, entry.name].join(' → ')}
                </Text>
              </Table.Cell>
              {breakpoints.isMedium && (
                <Table.TextCell>{entry.username || '-'}</Table.TextCell>
              )}
              {breakpoints.isLarge && (
                <Table.TextCell>{entry.url || '-'}</Table.TextCell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <SideSheet
        position={breakpoints.isMedium ? 'right' : 'bottom'}
        isShown={!!selectedEntry}
        onBeforeClose={() => setSelectedEntry(null)}
        preventBodyScrolling
        shouldCloseOnEscapePress
        shouldCloseOnOverlayClick
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        {selectedEntry && (
          <>
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              zIndex={1}
              flexShrink={0}
              elevation={0}
              backgroundColor="white"
            >
              <Pane padding={majorScale(2)} borderBottom="muted">
                <Heading size={600}>{selectedEntry.name}</Heading>
                <Paragraph size={400} color="muted">
                  {selectedEntry.path.join(' → ')}
                </Paragraph>
              </Pane>
            </Pane>
            <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
              <FormField label="Username" marginBottom={majorScale(3)}>
                <CopyableTextInput
                  value={selectedEntry.username}
                  readOnly={true}
                  width="100%"
                />
              </FormField>
              <FormField label="Password" marginBottom={majorScale(3)}>
                <PasswordInput
                  onReveal={() => new Promise((resolve) => resolve('test1234'))}
                  readOnly={true}
                  width="100%"
                />
              </FormField>
              <FormField label="URL" marginBottom={majorScale(3)}>
                <CopyableTextInput
                  value={selectedEntry.url}
                  readOnly={true}
                  width="100%"
                />
              </FormField>
              <TextareaField label="Notes" value="test" readOnly />
            </Pane>
          </>
        )}
      </SideSheet>
    </>
  );
};

export default EntryList;
