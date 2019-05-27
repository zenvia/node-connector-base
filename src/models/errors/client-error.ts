import { ApplicationError, IErrorDTO } from './abstract-application-error';
export { ApplicationError, IErrorDTO };

export class ClientError extends ApplicationError {

  constructor(code: string, message: string, httpStatusCode: number) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }

  toDTO(): IErrorDTO {
    return {
      code: this.code,
      message: this.message,
      httpStatusCode: this.httpStatusCode,
    } as IErrorDTO;
  }

}
