import { describe, expect, it } from '@jest/globals'
import { User } from './helpers'
import { ObjectState, CollectionState } from '../src'
import StateValues from '../src/lib/state-values'

describe('Collection', () => {
  it('should create object states', () => {
    // Arrange
    const users = [new User()]

    // Act
    const collection = new CollectionState(users)

    // Assert
    expect(collection.elements).toHaveLength(1)
    expect(collection.elements[0]).toBeInstanceOf(ObjectState)
  })

  describe('dirtyElements', () => {
    it('should not contain dirty elements', () => {
      // Arrange
      const users = [new User()]

      // Act
      const collection = new CollectionState(users)

      // Assert
      expect(collection.elements).toHaveLength(1)
      expect(collection.dirtyElements).toHaveLength(0)
    })

    it('should contain dirty elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })
      const collection = new CollectionState([user])

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
      const collection = new CollectionState([user])

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
      const collection = new CollectionState([user])

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

      const collection = new CollectionState<User>([])

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

      const collection = new CollectionState<User>([user])
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

      const collection = new CollectionState<User>([user])
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

      const collection = new CollectionState<User>([user])

      // Act
      const result = collection.build()

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toBeInstanceOf(User)
      expect(result[0].firstName).toBe('Eugene')
    })
  })

  describe('values', () => {
    it('should contain all elements', () => {
      // Arrange
      const user1 = new User({
        firstName: 'Eugene'
      })
      const user2 = new User({
        firstName: 'Spongebob'
      })

      const collection = new CollectionState<User>([user1, user2])

      // Act
      const result = collection.values

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(StateValues)
      expect(result[0].firstName).toBe(user1.firstName)
      expect(result[1]).toBeInstanceOf(StateValues)
      expect(result[1].firstName).toBe(user2.firstName)
    })
  })

  describe('filter', () => {
    it('should filter', () => {
      // Arrange
      const user1 = new User({
        firstName: 'Eugene'
      })
      const user2 = new User({
        firstName: 'Spongebob'
      })

      const collection = new CollectionState<User>([user1, user2])

      // Act
      const result = collection.filter(x => x.firstName === 'Spongebob')

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toBeInstanceOf(ObjectState)
      expect(result[0].properties.firstName.value).toBe(user2.firstName)
    })
  })

  describe('find', () => {
    it('should find', () => {
      // Arrange
      const user1 = new User({
        firstName: 'Eugene'
      })
      const user2 = new User({
        firstName: 'Spongebob'
      })

      const collection = new CollectionState<User>([user1, user2])

      // Act
      const result = collection.find(x => x.firstName === 'Spongebob')

      // Assert
      expect(result).toBeInstanceOf(ObjectState)
      expect(result!.properties.firstName.value).toBe(user2.firstName)
    })
  })

  describe('some', () => {
    it('should work', () => {
      // Arrange
      const user1 = new User({
        firstName: 'Eugene'
      })
      const user2 = new User({
        firstName: 'Spongebob'
      })

      const collection = new CollectionState<User>([user1, user2])

      // Assert
      expect(collection.some(x => x.firstName === 'Spongebob')).toBeTruthy()
      expect(collection.some(x => x.firstName === 'Patrick')).toBeFalsy()
    })
  })

  describe('errorElements', () => {
    it('should not contain error elements', () => {
      // Arrange
      const users = [new User()]

      // Act
      const collection = new CollectionState(users)

      // Assert
      expect(collection.elements).toHaveLength(1)
      expect(collection.errorElements).toHaveLength(0)
    })

    it('should contain dirty elements', () => {
      // Arrange
      const collection = new CollectionState([new User()])

      // Act
      const act = () => collection.get(0).errors = ['Whoops']

      // Assert
      expect(collection.elements).toHaveLength(1)
      expect(collection.errorElements).toHaveLength(0)

      act()

      expect(collection.elements).toHaveLength(1)
      expect(collection.errorElements).toHaveLength(1)
    })
  })

  describe('clearErrors', () => {
    it('should call clearErrors on all elements', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene'
      })

      const collection = new CollectionState<User>([user])
      const state = collection.get(0)

      state.properties.firstName.errors = ['Error']

      // Act
      const act = () => collection.clearErrors()

      // Assert
      expect(state.hasErrors).toBeTruthy()

      act()

      expect(state.hasErrors).toBeFalsy()
      expect(state.properties.firstName.errors).toEqual([])
    })
  })
})
