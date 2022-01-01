import { AppError, AppErrorName } from '@kpweb/error';

const destroySession = async (): Promise<void> => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
  });

  if (response.ok) {
    return;
  }

  throw new AppError('Unknown error', {
    name: AppErrorName.UNKNOWN,
    extra: {
      status: response.status,
      body: await response.json(),
    },
  });
};

export default destroySession;
