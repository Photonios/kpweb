import { AppError, AppErrorName } from '@kpweb/error';
import { Config } from '@kpweb/taxonomies';

const listConfig = async (): Promise<Config> => {
  const response = await fetch('/api/config', {
    method: 'GET',
  });

  if (response.ok) {
    return await response.json();
  }

  switch (response.status) {
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

export default listConfig;
