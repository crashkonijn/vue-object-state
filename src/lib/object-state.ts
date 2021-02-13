import { StateBuilder } from './state-builder';
import { IBuildable, IState, ObjectProperties } from './types';

export class ObjectState<TObject> implements IState, IBuildable<TObject> {
  public readonly properties: ObjectProperties<TObject>;

  get isDirty(): boolean {
    return this.properties.isDirty;
  }

  constructor(obj: TObject) {
    this.properties = new StateBuilder().build(obj);
  }

  build(): TObject {
    return this.properties.build();
  }
}
