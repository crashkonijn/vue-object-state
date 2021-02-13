import _ from 'lodash';

import { IBuildable, IState, ObjectProperties } from './types';

export class PropertiesState<TObject> implements IState, IBuildable<TObject> {
  private _properties!: ObjectProperties<TObject>;
  private _original: TObject;

  get isDirty(): boolean {
    return Object.values(this._properties).some((x) => (x as IState).isDirty);
  }

  constructor(obj: TObject, properties: ObjectProperties<TObject>) {
    this._properties = properties;
    this._original = obj;

    Object.getOwnPropertyNames(properties).forEach((key: string) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this._properties[key as keyof TObject];
        },
      });
    });
  }

  build(): TObject {
    const obj = _.cloneDeep(this._original);

    Object.getOwnPropertyNames(this._properties).forEach((key: string) => {
      _.set(obj as never, key, this._properties[key as keyof TObject].build());
    });

    return obj;
  }
}
