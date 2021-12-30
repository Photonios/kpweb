import React from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { EntryDTO } from '../types';

const tokenize = (text: string): string[] =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-zA-Z_ ]/gi, '')
    .split(' ');

const tokenizeEntry = (entry: EntryDTO): string[] => [
  ...entry.path.map(tokenize),
  ...tokenize(entry.name),
  ...tokenize(entry.username),
];

const filterEntries = AwesomeDebouncePromise(
  (entries: EntryDTO[], query: string) => {
    const queryTokens = tokenize(query);

    return entries.filter((entry) => {
      const entryTokens = tokenizeEntry(entry);
      return queryTokens.every((queryToken) =>
        entryTokens.some((entryToken) => entryToken.includes(queryToken))
      );
    });
  },
  150
);

const useFilteredEntries = (entries: EntyDTO[], query: string): EntryDTO[] => {
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  React.useEffect(async () => {
    if (!query) {
      setFilteredEntries(entries);
      return;
    }

    setFilteredEntries(await filterEntries(entries, query));
  }, [entries, query]);

  return filteredEntries;
};

export default useFilteredEntries;
