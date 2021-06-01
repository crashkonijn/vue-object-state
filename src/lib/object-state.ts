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
}
