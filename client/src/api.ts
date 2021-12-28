import { AppError, AppErrorName } from './error';

export const createSession = async ({
  password,
}: {
  password: string;
}): boolean => {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  if (response.ok) {
    return;
  }

  switch (response.status) {
    case 403:
      throw new AppError('Incorrect password or corrupt database', {
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

export const listEntries = async () => {
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
