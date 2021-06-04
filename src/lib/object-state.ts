import { StateBuilder } from './state-builder';
import {
  IBuildable,
  ICleanable,
  IErrors,
  IResetable,
  IState,
  IValues,
  ObjectProperties,
  ObjectValues,
} from './types';

export class ObjectState<TObject>
  implements
    IState,
    ICleanable,
    IResetable,
    IBuildable<TObject>,
    IValues<TObject>,
    IErrors {
  private _isNew = false;
  private _isDeleted = false;

  public properties: ObjectProperties<TObject>;

  get isDirty(): boolean {
    return this.properties.isDirty;
  }

  get errors(): string[] {
    return this.properties.errors;
  }

  set errors(errors: string[]) {
    this.properties.errors = errors;
  }

  get hasErrors(): boolean {
    return this.properties.hasErrors;
  }

  get values(): ObjectValues<TObject> {
    return this.properties.values;
  }

  get isNew(): boolean {
    return this._isNew;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  constructor(obj: TObject) {
    this.properties = new StateBuilder().build(obj);
  }

  build(): TObject {
    return this.properties.build();
  }

  clean(): void {
    this.properties.clean();
    this._isNew = false;
  }

  reset(): void {
    this.properties.reset();
    this._isDeleted = false;
  }

  clearErrors(): void {
    this.properties.clearErrors();
  }

  markAsDeleted(): this {
    this._isDeleted = true;
    return this;
  }

  markAsNew(): this {
    this._isNew = true;
    return this;
  }
}
