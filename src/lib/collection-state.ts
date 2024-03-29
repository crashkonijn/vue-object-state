import { ObjectState } from './object-state';
import StateValues from './state-values';
import { IBuildable, ICleanable, IResetable, ObjectValues } from './types';

export class CollectionState<T>
  implements ICleanable, IResetable, IBuildable<T[]> {
  private _elements: ObjectState<T>[];

  constructor(elements: T[]) {
    this._elements = elements.map((x) => new ObjectState(x));
  }

  get elements(): ObjectState<T>[] {
    return this._elements;
  }

  get dirtyElements(): ObjectState<T>[] {
    return this._elements.filter((x) => x.isDirty);
  }

  get errorElements(): ObjectState<T>[] {
    return this._elements.filter((x) => x.hasErrors);
  }

  get newElements(): ObjectState<T>[] {
    return this._elements.filter((x) => x.isNew);
  }

  get deletedElements(): ObjectState<T>[] {
    return this._elements.filter((x) => x.isDeleted);
  }

  get count(): number {
    return this._elements.length;
  }

  get values(): ObjectValues<T>[] {
    return this._elements.map((x) => x.values);
  }

  get(index: 0): ObjectState<T> {
    return this._elements[index];
  }

  add(element: T) {
    this._elements.push(new ObjectState(element));
  }

  remove(element: ObjectState<T> | ObjectValues<T>) {
    this._elements = this._elements.filter(
      (x) => x.guid !== this.getGuid(element)
    );
  }

  clean(): void {
    this._elements = this._elements.filter((x) => !x.isDeleted);

    this._elements.forEach((x) => x.clean());
  }

  reset(): void {
    this._elements = this._elements.filter((x) => !x.isNew);

    this._elements.forEach((x) => x.reset());
  }

  build(): T[] {
    return this._elements.map((x) => x.build());
  }

  filter(fn: (element: ObjectValues<T>) => boolean): ObjectState<T>[] {
    return this._elements.filter((e) => fn(e.values));
  }

  find(fn: (element: ObjectValues<T>) => boolean): ObjectState<T> | undefined {
    return this._elements.find((e) => fn(e.values));
  }

  some(fn: (element: ObjectValues<T>) => boolean): boolean {
    return this._elements.some((e) => fn(e.values));
  }

  clearErrors(): void {
    this._elements.forEach((x) => x.clearErrors());
  }

  private getGuid(element: ObjectState<T> | ObjectValues<T>): string {
    if (element instanceof StateValues) {
      return element.propertiesState.guid;
    }

    return element.guid;
  }
}
