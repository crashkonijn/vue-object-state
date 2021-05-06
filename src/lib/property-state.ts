import _ from 'lodash';
import Vue from 'vue';

import { IBuildable, ICleanable, IResetable, IState } from './types';

export class PropertyState<TValue>
  implements IState, IBuildable<TValue>, ICleanable, IResetable {
  private _key: string;
  private _value!: TValue;
  private _original!: TValue;

  get key(): string {
    return this._key;
  }

  get value(): TValue {
    return this._value;
  }

  set value(value: TValue) {
    this._value = value;
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
  }

  build(): TValue {
    return this._value;
  }

  clean(): void {
    this._original = this._value;
  }

  private getResetValue(value?: TValue) {
    if (value === null || value === undefined) return this._original;

    return value;
  }
}
