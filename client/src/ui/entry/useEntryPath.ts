import { EntryDataDTO } from '@kpweb/taxonomies';

interface Options {
  includingName: boolean;
}

const useEntryPath = (
  entryData: EntryDataDTO,
  { includingName }: Options
): string => {
  const fullPath = [...entryData.path];
  if (includingName) {
    fullPath.push(entryData.name);
  }

  return fullPath.join(' → ');
};

export default useEntryPath;
