import { AppError, AppErrorName } from '@kpweb/error';

const createSession = async ({
  password,
}: {
  password: string;
}): Promise<void> => {
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

export default createSession;
