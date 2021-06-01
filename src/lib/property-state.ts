import _ from 'lodash';
import Vue from 'vue';

import { IBuildable, ICleanable, IErrors, IResetable, IState } from './types';

export class PropertyState<TValue>
  implements IState, IBuildable<TValue>, ICleanable, IResetable, IErrors {
  private _key: string;
  private _value!: TValue;
  private _original!: TValue;
  private _errors!: string[];

  get key(): string {
    return this._key;
  }

  get value(): TValue {
    return this._value;
  }

  set value(value: TValue) {
    this._value = value;
  }

  get errors(): string[] {
    return this._errors;
  }

  set errors(errors: string[]) {
    this._errors = errors;
  }

  get hasErrors(): boolean {
    return !!this._errors.length;
  }

  get isDirty(): boolean {
    return !_.isEqual(this._value, this._original);
  }

  constructor(key: string, value: TValue) {
    this._key = key;
    this.reset(value);
  }

  reset(value?: TValue) {
    Vue.set(this, '_value', this.getResetValue(value));
    Vue.set(this, '_original', this.getResetValue(value));
    Vue.set(this, '_errors', []);
  }

  build(): TValue {
    return this._value;
  }

  clean(): void {
    this._original = this._value;
    this.errors = [];
  }

  clearErrors(): void {
    this._errors = [];
  }

  private getResetValue(value?: TValue) {
    if (value === null || value === undefined) return this._original;

    return value;
  }
}
