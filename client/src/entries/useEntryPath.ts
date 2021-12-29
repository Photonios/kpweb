import { EntryDTO } from '../types';

interface Options {
  includingName: boolean;
}

const useEntryPath = (entry: EntryDTO, { includingName }: Options): string => {
  const fullPath = [...entry.path];
  if (includingName) {
    fullPath.push(entry.name);
  }

  return fullPath.join(' → ');
};

export default useEntryPath;
