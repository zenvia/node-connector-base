import { ApplicationError, IErrorDTO, ErrorDTO } from './abstract-application-error';
export { ApplicationError, IErrorDTO, ErrorDTO };

export class ClientError extends ApplicationError {

  constructor(code: string, message: string, httpStatusCode: number) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }

  toDTO(): IErrorDTO {
    return new ErrorDTO(this.code, this.message, this.httpStatusCode);
  }

}
