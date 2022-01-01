import AppErrorName from './appErrorName';

type AppErrorExtraData = Record<string, unknown>;

interface AppErrorData {
  name: AppErrorName;
  error?: Error;
  extra?: AppErrorExtraData;
}

class AppError extends Error {
  constructor(message: string, private data: AppErrorData) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
    this.name = data.name;

    if (data.error && data.error.stack) {
      this.stack = data.error.stack;
    }
  }

  originalError(): Error | null {
    return this.data.error || null;
  }

  extra(): AppErrorExtraData {
    return this.data.extra || {};
  }
}

export default AppError;
