export interface IErrorDetail {

  code: string;
  element: string;
  elementId: string;
  reason: string;

}

export class ErrorDetail implements IErrorDetail {

  code: string;
  element: string;
  elementId: string;
  reason: string;

  constructor(code: string, element: string, elementId: string, reason: string) {
    this.code = code;
    this.element = element;
    this.elementId = elementId;
    this.reason = reason;
  }

}
