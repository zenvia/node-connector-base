import { IError } from './error';
import { IErrorDetail } from './error-detail.d';
export { IError, IErrorDetail };

export abstract class AbstractError extends Error {

  public code: string;
  public httpStatusCode = 500;

  constructor(message: string) {
    super(message);
  }

  abstract toJson(): IError;

}
