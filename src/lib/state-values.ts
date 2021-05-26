import { PropertiesState } from './properties-state';
import { PropertyState } from './property-state';
import { ObjectProperties, ObjectValues } from './types';

export default class StateValues<TObject> {
  private readonly _propertiesState!: PropertiesState<TObject>;

  get propertiesState(): PropertiesState<TObject> {
    return this._propertiesState;
  }

  constructor(state: PropertiesState<TObject>) {
    this._propertiesState = state;
  }

  public static from<TObject>(
    state: PropertiesState<TObject>,
    properties: ObjectProperties<TObject>
  ): ObjectValues<TObject> {
    const values = new StateValues(state);

    Object.getOwnPropertyNames(properties).forEach((key: string) => {
      const state = properties[key as keyof TObject];

      if (state instanceof PropertyState) {
        Object.defineProperty(values, key, {
          get: () => state.value,
          set: (value) => (state.value = value),
        });
      }

      if (state instanceof PropertiesState) {
        Object.defineProperty(values, key, {
          get: () => state.values,
        });
      }
    });

    return (values as unknown) as ObjectValues<TObject>;
  }
}
