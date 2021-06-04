/* eslint-disable @typescript-eslint/ban-types */
import { PropertyState } from './property-state';
import StateValues from './state-values';

export interface IDirty {
  isDirty: boolean;
}

export interface IErrors {
  errors: string[];
  hasErrors: boolean;
  clearErrors(): void;
}

export interface IBuildable<TObject> {
  build(): TObject;
}

export interface ICleanable {
  clean(): void;
}

export interface IResetable {
  reset(): void;
}

export interface IValues<TObject> {
  values: ObjectValues<TObject>;
}

export interface IStates {
  isNew: boolean;
  isDeleted: boolean;
  markAsNew(): this;
  markAsDeleted(): this;
}

export interface IGuid {
  guid: string;
}

export type ObjectProperties<TObject> = IDirty &
  IBuildable<TObject> &
  IValues<TObject> &
  ICleanable &
  IResetable &
  IErrors &
  IStates &
  IGuid &
  {
    [TKey in keyof TObject]: TObject[TKey] extends object
      ? ObjectProperties<TObject[TKey]>
      : PropertyState<TObject[TKey]>;
  };

export type ObjectValues<TObject> = StateValues<TObject> &
  {
    [TKey in keyof TObject]: TObject[TKey] extends object
      ? ObjectValues<TObject[TKey]>
      : TObject[TKey];
  };
