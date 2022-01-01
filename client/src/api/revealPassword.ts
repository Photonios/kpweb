import { AppError, AppErrorName } from '@kpweb/error';

const revealPassword = async (entryID: string): Promise<string> => {
  const response = await fetch(`/api/entries/${entryID}/password`, {
    method: 'GET',
  });

  if (response.ok) {
    const body = await response.json();
    return body.password;
  }

  switch (response.status) {
    case 401:
    case 403:
      throw new AppError('No active session', {
        name: AppErrorName.ACCESS_DENIED,
      });

    case 404:
      throw new AppError('No such entry', {
        name: AppErrorName.NOT_FOUND,
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

export default revealPassword;
