export class BaseGenerator<T extends object> {
  protected readonly model: T;

  public constructor(model?: T) {
    this.model = model ?? (Object.create({}) as T);
  }

  public default(mockData: Partial<T>): BaseGenerator<T> {
    Object.assign(this.model, mockData);
    return this;
  }

  public generate(): T {
    return this.model;
  }

  public setProperties(data: Partial<T>): BaseGenerator<T> {
    Object.assign(this.model, data);
    return this;
  }
}
