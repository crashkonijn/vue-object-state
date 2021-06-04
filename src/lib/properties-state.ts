import { Guid } from 'guid-typescript';
import _ from 'lodash';

import StateValues from './state-values';
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

export class PropertiesState<TObject>
  implements
    IDirty,
    IBuildable<TObject>,
    IValues<TObject>,
    ICleanable,
    IResetable,
    IErrors,
    IStates,
    IGuid {
  private _guid: string = Guid.create().toString();
  private _properties!: ObjectProperties<TObject>;
  private _original: TObject;
  private _key: string;
  private _values: ObjectValues<TObject> & StateValues<TObject>;
  private _errors!: string[];
  private _isNew = false;
  private _isDeleted = false;

  get guid(): string {
    return this._guid;
  }

  get isDirty(): boolean {
    return Object.values(this._properties).some((x) => (x as IDirty).isDirty);
  }

  get key(): string {
    return this._key;
  }

  get values(): ObjectValues<TObject> & StateValues<TObject> {
    return this._values;
  }

  get errors(): string[] {
    return this._errors;
  }

  set errors(errors: string[]) {
    this._errors = errors;
  }

  get hasErrors(): boolean {
    if (Object.values(this._properties).some((x) => (x as IErrors).hasErrors))
      return true;

    return !!this._errors.length;
  }

  get isNew(): boolean {
    return this._isNew;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  constructor(
    key: string,
    obj: TObject,
    properties: ObjectProperties<TObject>
  ) {
    this._key = key;
    this._properties = properties;
    this._original = obj;
    this._values = StateValues.from(this, properties);
    this._errors = [];

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
    this._errors = [];
    this._isNew = false;
  }

  reset(): void {
    Object.values(this._properties).forEach((x) => (x as IResetable).reset());
    this._errors = [];
    this._isDeleted = false;
  }

  clearErrors(): void {
    Object.values(this._properties).forEach((x) =>
      (x as IErrors).clearErrors()
    );
    this._errors = [];
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
