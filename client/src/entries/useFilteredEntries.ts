import React from 'react';

import { EntryDTO } from '../types';

const normalize = (text: string): string => text.toLowerCase().replace(' ', '');

const useFilteredEntries = (entries: EntyDTO[], query: string): EntryDTO[] => {
  const normalizedQuery = normalize(query);
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  React.useEffect(() => {
    setFilteredEntries(
      entries.filter(({ name }) => normalize(name).includes(normalizedQuery))
    );
  }, [entries, query]);

  return filteredEntries;
};

export default useFilteredEntries;
