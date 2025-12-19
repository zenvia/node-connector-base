import { IErrorDetail } from './error-detail';

export interface IError {
  code: string;
  message: string;
  httpStatusCode: number;
  details?: IErrorDetail[];
}
