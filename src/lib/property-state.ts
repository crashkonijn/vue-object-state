import _ from 'lodash';
import Vue from 'vue';

import { IBuildable, ICleanable, IResetable, IState } from './types';

export class PropertyState<TValue>
  implements IState, IBuildable<TValue>, ICleanable, IResetable {
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

  reset(value?: TValue) {
    Vue.set(this, '_value', value ?? this._original);
    Vue.set(this, '_original', value ?? this._original);
  }

  build(): TValue {
    return this._value;
  }

  clean(): void {
    this._original = this._value;
  }
}
