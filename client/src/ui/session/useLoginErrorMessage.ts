import { AppError, AppErrorName } from '@kpweb/error';

const useLoginErrorMessage = (err: Error | null): string | null => {
  if (!err) {
    return null;
  }

  const unknownMessage = 'An unknown error occurred.';

  if (err instanceof AppError) {
    switch (err.name) {
      case AppErrorName.ACCESS_DENIED:
        return 'You entered an incorrect password or the database is corrupt.';

      default:
        return unknownMessage;
    }
  }

  return unknownMessage;
};

export default useLoginErrorMessage;
