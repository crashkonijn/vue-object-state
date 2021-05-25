import _ from 'lodash';

import {
  IBuildable,
  ICleanable,
  IResetable,
  IState,
  ObjectProperties,
} from './types';

export class PropertiesState<TObject>
  implements IState, IBuildable<TObject>, ICleanable, IResetable {
  private _properties!: ObjectProperties<TObject>;
  private _original: TObject;
  private _key: string;

  get isDirty(): boolean {
    return Object.values(this._properties).some((x) => (x as IState).isDirty);
  }

  get key(): string {
    return this._key;
  }

  constructor(
    key: string,
    obj: TObject,
    properties: ObjectProperties<TObject>
  ) {
    this._key = key;
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
      if (typeof this._properties[key as keyof TObject].build !== 'function')
        return;

      _.set(obj as never, key, this._properties[key as keyof TObject].build());
    });

    return obj;
  }

  clean(): void {
    Object.values(this._properties).forEach((x) => (x as ICleanable).clean());
  }

  reset(): void {
    Object.values(this._properties).forEach((x) => (x as IResetable).reset());
  }
}
