import { ObjectState } from './object-state'
import { IBuildable, ICleanable, IResetable } from './types'

export default class Collection<T> implements ICleanable, IResetable, IBuildable<T[]> {
  private _elements: ObjectState<T>[];

  constructor(elements: T[]) {
    this._elements = elements.map(x => new ObjectState(x))
  }

  get elements(): ObjectState<T>[] {
    return this._elements
  }

  get dirtyElements(): ObjectState<T>[] {
    return this._elements.filter(x => x.isDirty)
  }

  count(): number {
    return this._elements.length
  }

  get(index: 0): ObjectState<T> {
    return this._elements[index]
  }

  add(element: T) {
    this._elements.push(new ObjectState(element))
  }

  clean(): void {
    this._elements.forEach(x => x.clean())
  }

  reset(): void {
    this._elements.forEach(x => x.reset())
  }

  build(): T[] {
    return this._elements.map(x => x.build());
  }
}
