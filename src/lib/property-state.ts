import _ from 'lodash';
import Vue from 'vue';

import { IBuildable, IState } from './types';

export class PropertyState<TValue> implements IState, IBuildable<TValue> {
  private _value!: TValue;
  private _original!: TValue;

  get value(): TValue {
    return this._value;
  }

  set value(value: TValue) {
    this._value = value;
  }

  get isDirty(): boolean {
    return !_.isEqual(this._value, this._original);
  }

  constructor(value: TValue) {
    this.reset(value);
  }

  reset(value: TValue) {
    Vue.set(this, '_value', value);
    Vue.set(this, '_original', value);
  }

  build(): TValue {
    return this._value;
  }
}
