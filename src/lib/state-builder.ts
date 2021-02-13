import Vue from 'vue';

import { PropertiesState } from './properties-state';
import { PropertyState } from './property-state';
import { IState, ObjectProperties } from './types';

export class StateBuilder {
  build<TObject>(obj: TObject): ObjectProperties<TObject> & IState {
    return (new PropertiesState(
      obj,
      this.buildProperties(obj)
    ) as unknown) as ObjectProperties<TObject>;
  }

  private buildProperties<TObject>(obj: TObject): ObjectProperties<TObject> {
    const properties = {};

    Object.getOwnPropertyNames(obj).forEach((key: string) => {
      const value = obj[key as keyof TObject];
      const state =
        typeof value === 'object'
          ? this.build(value)
          : this.buildProperty(value);

      Vue.set(properties, key, state);
    });

    return properties as ObjectProperties<TObject>;
  }

  private buildProperty<TValue>(value: TValue): PropertyState<TValue> {
    return new PropertyState(value);
  }
}
