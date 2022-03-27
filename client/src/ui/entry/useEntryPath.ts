import { EntryDTO } from '@kpweb/taxonomies';

interface Options {
  includingName: boolean;
}

const useEntryPath = (entry: EntryDTO, { includingName }: Options): string => {
  const fullPath = [...entry.data.path];
  if (includingName) {
    fullPath.push(entry.data.name);
  }

  return fullPath.join(' → ');
};

export default useEntryPath;
