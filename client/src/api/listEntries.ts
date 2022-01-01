import { AppError, AppErrorName } from '@kpweb/error';
import { EntryDTO } from '@kpweb/taxonomies';

const listEntries = async (): Promise<EntryDTO[]> => {
  const response = await fetch('/api/entries', {
    method: 'GET',
  });

  if (response.ok) {
    return await response.json();
  }

  switch (response.status) {
    case 401:
    case 403:
      throw new AppError('No active session', {
        name: AppErrorName.ACCESS_DENIED,
      });

    default:
      throw new AppError('Unknown error', {
        name: AppErrorName.UNKNOWN,
        extra: {
          status: response.status,
          body: await response.json(),
        },
      });
  }
};

export default listEntries;
