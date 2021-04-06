/* eslint-disable @typescript-eslint/ban-types */
import { PropertyState } from './property-state';

export interface IState {
  isDirty: boolean;
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

export type ObjectProperties<TObject> = IState &
  IBuildable<TObject> & ICleanable & IResetable &
  {
    [TKey in keyof TObject]: TObject[TKey] extends object
      ? ObjectProperties<TObject[TKey]>
      : PropertyState<TObject[TKey]>;
  };
