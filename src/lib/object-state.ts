import { StateBuilder } from './state-builder';
import {
  IBuildable,
  ICleanable,
  IDirty,
  IErrors,
  IGuid,
  IResetable,
  IStates,
  IValues,
  ObjectProperties,
  ObjectValues,
} from './types';

export class ObjectState<TObject>
  implements
    IDirty,
    ICleanable,
    IResetable,
    IBuildable<TObject>,
    IValues<TObject>,
    IErrors,
    IStates,
    IGuid {
  public properties: ObjectProperties<TObject>;

  get guid(): string {
    return this.properties.guid;
  }

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
    return this.properties.isNew;
  }

  get isDeleted(): boolean {
    return this.properties.isDeleted;
  }

  constructor(obj: TObject) {
    this.properties = new StateBuilder().build(obj);
  }

  build(): TObject {
    return this.properties.build();
  }

  clean(): void {
    this.properties.clean();
  }

  reset(): void {
    this.properties.reset();
  }

  clearErrors(): void {
    this.properties.clearErrors();
  }

  markAsDeleted(): this {
    this.properties.markAsDeleted();
    return this;
  }

  markAsNew(): this {
    this.properties.markAsNew();
    return this;
  }
}
