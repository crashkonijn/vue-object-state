import { describe, expect, it } from '@jest/globals'
import { User } from './helpers'
import Collection from '../src/lib/collection'
import { ObjectState } from '../src'

describe('Collection', () => {
  it('should create object states', () => {
    // Arrange
    const users = [new User()]

    // Act
    const collection = new Collection(users)

    // Assert
    expect(collection.elements).toHaveLength(1)
    expect(collection.elements[0]).toBeInstanceOf(ObjectState)
  })

  describe('dirtyElements', () => {
    it('should not contain clean elements', () => {
      // Arrange
      const users = [new User()]

      // Act
      const collection = new Collection(users)

      // Assert
      expect(collection.elements).toHaveLength(1)
      expect(collection.dirtyElements).toHaveLength(0)
    })

    it('should contain dirty elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })
      const collection = new Collection([user])

      // Act
      const act = () => collection.get(0).properties.firstName.value = 'Spongebob'

      // Assert
      expect(collection.elements).toHaveLength(1)
      expect(collection.dirtyElements).toHaveLength(0)

      act()

      expect(collection.elements).toHaveLength(1)
      expect(collection.dirtyElements).toHaveLength(1)
    })
  })

  describe('count', () => {
    it('should return element length', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      // Act
      const collection = new Collection([user])

      // Assert
      expect(collection.count).toBe(1)
    })
  })

  describe('get', () => {
    it('should return element', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      // Act
      const collection = new Collection([user])

      // Assert
      expect(collection.get(0).properties.firstName.value).toBe('Eugene')
    })
  })

  describe('add', () => {
    it('should push new ObjectState', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      const collection = new Collection<User>([])

      // Act
      const act = () => collection.add(user)

      // Assert
      expect(collection.count).toBe(0)

      act()

      expect(collection.count).toBe(1)
      expect(collection.get(0).properties.firstName.value).toBe('Eugene')
    })
  })

  describe('clean', () => {
    it('should call clean on all elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      const collection = new Collection<User>([user])
      const state = collection.get(0)

      state.properties.firstName.value = 'Spongebob'

      // Act
      const act = () => collection.clean()

      // Assert
      expect(state.isDirty).toBeTruthy()

      act()

      expect(state.isDirty).toBeFalsy()
      expect(state.properties.firstName.value).toBe('Spongebob')
    })
  })

  describe('reset', () => {
    it('should call reset on all elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      const collection = new Collection<User>([user])
      const state = collection.get(0)

      state.properties.firstName.value = 'Spongebob'

      // Act
      const act = () => collection.reset()

      // Assert
      expect(state.isDirty).toBeTruthy()

      act()

      expect(state.isDirty).toBeFalsy()
      expect(state.properties.firstName.value).toBe('Eugene')
    })
  })

  describe('build', () => {
    it('should build all elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      const collection = new Collection<User>([user])

      // Act
      const result = collection.build()

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toBeInstanceOf(User)
      expect(result[0].firstName).toBe('Eugene')
    })
  })
})
