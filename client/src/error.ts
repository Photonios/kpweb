export enum AppErrorName {
  INPUT = 'AppErrorInput',
  AUTH_REQUIRED = 'AppErrorAuthRequired',
  ACCESS_DENIED = 'AppErrorAccessDenied',
  NOT_FOUND = 'AppErrorNotFound',
  CONFLICT = 'AppErrorConflict',
  SERVER = 'AppErrorServer',
  SERVER_GATEWAY = 'AppErrorServerGateway',
  REQUEST = 'AppErrorRequest',
  TIMEOUT = 'AppErrorTimeout',
  CONTENT_TYPE = 'AppErrorContentType',
  DECODE = 'AppErrorDecode',
  NETWORK = 'AppErrorNetwork',
  UNKNOWN = 'AppErrorUnknown',
}

export type AppErrorExtraData = Record<string, unknown>;

export interface AppErrorData {
  name: AppErrorName;
  error?: Error;
  extra?: AppErrorExtraData;
}

export class AppError extends Error {
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
