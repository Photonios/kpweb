import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { EntryDTO } from '@kpweb/taxonomies';

type TokenizedEntries = [string[], EntryDTO][];

const tokenize = (text: string): string[] =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-zA-Z_ ]/gi, '')
    .split(' ');

const tokenizeEntry = (entry: EntryDTO): string[] => [
  ...entry.path.flatMap(tokenize),
  ...entry.tags.flatMap(tokenize),
  ...tokenize(entry.name),
  ...tokenize(entry.username),
];

const tokenizeEntries = (entries: EntryDTO[]): TokenizedEntries =>
  entries.map((entry) => [tokenizeEntry(entry), entry]);

const filterEntries = AwesomeDebouncePromise(
  (tokenizedEntries: TokenizedEntries, query: string) => {
    const queryTokens = tokenize(query);

    return tokenizedEntries
      .filter(([entryTokens, _]) =>
        queryTokens.every((queryToken) =>
          entryTokens.some((entryToken) => entryToken.includes(queryToken))
        )
      )
      .map(([_, entry]) => entry);
  },
  150
);

const useFilteredEntries = (entries: EntryDTO[], query: string): EntryDTO[] => {
  const tokenizedEntries = React.useMemo(
    () => tokenizeEntries(entries),
    [entries]
  );
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  React.useEffect(() => {
    if (!query) {
      setFilteredEntries(entries);
      return;
    }

    const performFiltering = async () => {
      setFilteredEntries(await filterEntries(tokenizedEntries, query));
    };

    performFiltering();
  }, [entries, query]);

  return filteredEntries;
};

export default useFilteredEntries;
