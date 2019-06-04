import { ClientError, IError } from './client-error';
import { IErrorDetail } from './error-detail';

export class ValidationError extends ClientError {

  public details: IErrorDetail[];

  constructor(message: string, details?: IErrorDetail[]) {
    super('ValidationError', message, 422);

    if (details && details.length > 0) {
      this.details = details;
    } else {
      this.details = [];
    }
  }

  addDetail(detail: IErrorDetail): void {
    this.details.push(detail);
  }

  toJson(): IError {
    return {
      code: this.code,
      message: this.message,
      httpStatusCode: this.httpStatusCode,
      details: this.details,
    } as IError;
  }

}
