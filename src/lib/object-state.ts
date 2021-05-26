import { StateBuilder } from './state-builder';
import StateValues from './state-values';
import {
  IBuildable,
  ICleanable,
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
    IValues<TObject> {
  public properties: ObjectProperties<TObject>;

  get isDirty(): boolean {
    return this.properties.isDirty;
  }

  get values(): StateValues<TObject> & ObjectValues<TObject> {
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
}
