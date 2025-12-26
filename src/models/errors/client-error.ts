import { AbstractError, IError } from './abstract-error';
export { AbstractError, IError };

export class ClientError extends AbstractError {
  constructor(code: string, message: string, httpStatusCode: number) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }

  toJson(): IError {
    return {
      code: this.code,
      message: this.message,
      httpStatusCode: this.httpStatusCode,
    } as IError;
  }
}
