import React from 'react';
import {
  Pane,
  Table,
  Text,
  SideSheet,
  Paragraph,
  Heading,
  TextInput,
  TextInputField,
  FormField,
  majorScale,
  EyeOpenIcon,
  ClipboardIcon,
  IconButton,
  TextareaField,
} from 'evergreen-ui';

import useMediaQuery from '../useMediaQuery';
import { EntryDTO } from './types';

interface Props {
  entries: EntryDTO[];
}

const normalize = (text: string): string => text.toLowerCase().replace(' ', '');

const EntryList = ({ entries }: Props) => {
  const isLargeWindow = useMediaQuery('(min-width: 1200px)');
  const isMediumWindow = useMediaQuery('(min-width: 900px)');

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
          {isMediumWindow && (
            <Table.TextHeaderCell>Username</Table.TextHeaderCell>
          )}
          {isLargeWindow && <Table.TextHeaderCell>URL</Table.TextHeaderCell>}
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
              {isMediumWindow && (
                <Table.TextCell>{entry.username || '-'}</Table.TextCell>
              )}
              {isLargeWindow && (
                <Table.TextCell>{entry.url || '-'}</Table.TextCell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <SideSheet
        position={isMediumWindow ? 'right' : 'bottom'}
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
              <TextInputField
                label="Username"
                value={selectedEntry.username}
                readOnly
                width="100%"
              />
              <FormField label="Password" marginBottom={majorScale(3)}>
                <Pane display="flex" alignItems="center">
                  <TextInput
                    type="password"
                    value={'**********'}
                    readOnly
                    width="100%"
                  />
                  <IconButton icon={<EyeOpenIcon color="muted" size={20} />} />
                  <IconButton
                    icon={<ClipboardIcon color="muted" size={20} />}
                  />
                </Pane>
              </FormField>
              <TextInputField
                label="URL"
                value={selectedEntry.url}
                readOnly
                width="100%"
              />
              <TextareaField label="Notes" value="test" />
            </Pane>
          </>
        )}
      </SideSheet>
    </>
  );
};

export default EntryList;
