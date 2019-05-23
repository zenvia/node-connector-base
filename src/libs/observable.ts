/* tslint:disable array-type */
export type CallbackFn<T> = (arg: T) => void;

export class Observable<T> {

  private observers: CallbackFn<T>[];
  constructor() {
    this.observers = [];
  }

  subscribe(f: CallbackFn<T>): void {
    this.observers.push(f);
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer(data));
  }

}
