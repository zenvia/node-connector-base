import { IErrorDTO } from './error-dto';
import { IErrorDetail } from './error-detail';
export { IErrorDTO, IErrorDetail };

export abstract class ApplicationError extends Error {

  public code: string;
  public httpStatusCode = 500;

  constructor(message: string) {
    super(message);
  }

  abstract toDTO(): IErrorDTO;

}
