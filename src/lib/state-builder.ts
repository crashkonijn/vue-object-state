import Vue from 'vue';

import { PropertiesState } from './properties-state';
import { PropertyState } from './property-state';
import { IState, ObjectProperties } from './types';

export class StateBuilder {
  build<TObject>(
    obj: TObject,
    key = 'root'
  ): ObjectProperties<TObject> & IState {
    return (new PropertiesState(
      key,
      obj,
      this.buildProperties(obj)
    ) as unknown) as ObjectProperties<TObject>;
  }

  private buildProperties<TObject>(obj: TObject): ObjectProperties<TObject> {
    const properties = {};

    Object.getOwnPropertyNames(obj).forEach((key: string) => {
      if (key.startsWith('_')) return;

      const value = obj[key as keyof TObject];
      const state = this.isObject(value)
        ? this.build(value, key)
        : this.buildProperty(value, key);

      Vue.set(properties, key, state);
    });

    return properties as ObjectProperties<TObject>;
  }

  private buildProperty<TValue>(
    value: TValue,
    key: string
  ): PropertyState<TValue> {
    return new PropertyState(key, value);
  }

  private isObject<TValue>(value: TValue): boolean {
    if (!value) return false;

    if (value instanceof Date) return false;

    if (Array.isArray(value)) return false;

    return typeof value === 'object';
  }
}
