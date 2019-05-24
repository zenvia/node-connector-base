import { IErrorDetail } from './error-detail';

export interface IErrorDTO {

  code: string;
  message: string;
  httpStatusCode: number;
  details?: IErrorDetail[];

}
