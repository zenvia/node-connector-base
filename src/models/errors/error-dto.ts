import { IErrorDetail } from './error-detail';

export interface IErrorDTO {

  code: string;
  message: string;
  httpStatusCode: number;
  details: IErrorDetail[];

}

export class ErrorDTO implements IErrorDTO {

  code: string;
  message: string;
  httpStatusCode: number;
  details: IErrorDetail[];

  constructor(code: string, message: string, httpStatusCode: number, details?: IErrorDetail[]) {
    this.code = code;
    this.message = message;
    this.httpStatusCode = httpStatusCode;

    if (details && details.length > 0) {
      this.details = details;
    }
  }

}
