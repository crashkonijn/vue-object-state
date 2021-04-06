import { StateBuilder } from './state-builder';
import {
  IBuildable,
  ICleanable,
  IResetable,
  IState,
  ObjectProperties,
} from './types';

export class ObjectState<TObject>
  implements IState, ICleanable, IResetable, IBuildable<TObject> {
  public properties: ObjectProperties<TObject>;

  get isDirty(): boolean {
    return this.properties.isDirty;
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
