import { describe, expect, it } from '@jest/globals'

import { Address, User } from './helpers'
import { ObjectState } from '../src/lib/object-state'
import { PropertiesState } from '../src/lib/properties-state'
import StateValues from '../src/lib/state-values'
import { Guid } from 'guid-typescript'

describe('ObjectState', () => {
  it('should initialize object correctly', () => {
    // Arrange
    const user = new User({
      firstName: 'Peter',
      address: new Address({
        street: 'sesame'
      })
    })

    // Act
    const state = new ObjectState(user)

    // Assert
    expect(state).not.toBeUndefined()
  })

  it('should initialize properties as PropertiesState', () => {
    // Arrange
    const user = new User({
      firstName: 'Eugene',
      address: new Address({
        street: 'Anchor Way'
      })
    })

    // Act
    const state = new ObjectState(user)

    // Assert
    expect(state.properties).toBeInstanceOf(PropertiesState)
  })

  describe('guid', () => {
    it('should contain a guid', () => {
      // Arrange
      const state = new ObjectState(new User())

      // Assert
      expect(Guid.isGuid(state.guid)).toBeTruthy()
    })

    it('should not be the same', () => {
      // Arrange
      const stateA = new ObjectState(new User())
      const stateB = new ObjectState(new User())

      // Assert
      expect(stateA.guid).not.toEqual(stateB.guid)
    })
  })

  describe('isDirty', () => {
    it('should update correctly', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene',
      })
      const state = new ObjectState(user)

      // Act
      const act = (value: string) => state.properties.firstName.value = value

      // Assert
      expect(state.isDirty).toBeFalsy()
      act('Spongebob')
      expect(state.isDirty).toBeTruthy()
      act('Eugene')
      expect(state.isDirty).toBeFalsy()
    })
  })

  describe('build', () => {
    it('should return the correct instances', () => {
      // Arrange
      const user = new User({
        firstName: 'Eugene',
        address: new Address({
          street: 'Anchor Way'
        })
      })
      const state = new ObjectState(user)

      // Act
      const result = state.build()

      // Assert
      expect(result).toBeInstanceOf(User)
      expect(result.address).toBeInstanceOf(Address)
    })

    it('should return all correct data', () => {
      // Arrange
      const firstName = 'Eugene'
      const street = 'Anchor Way'
      const user = new User({
        firstName: 'Spongebob',
        address: new Address({
          street: street
        })
      })
      const state = new ObjectState(user)
      state.properties.firstName.value = firstName

      // Act
      const result = state.build()

      // Assert
      expect(result.firstName).toBe(firstName)
      expect(result.address.street).toBe(street)
    })
  })

  it('should be able to clean', () => {
    // Arrange
    const firstName = 'Eugene'
    const user = new User({
      firstName: 'Spongebob',
    })
    const state = new ObjectState(user)
    state.properties.firstName.value = firstName

    // Act
    const act = () => state.clean()

    // Assert
    expect(state.properties.firstName.value).toBe(firstName)
    expect(state.isDirty).toBeTruthy()

    act()

    expect(state.properties.firstName.value).toBe(firstName)
    expect(state.isDirty).toBeFalsy()
  })

  it('should be able to reset', () => {
    // Arrange
    const firstName = 'Eugene'
    const user = new User({
      firstName: 'Spongebob',
    })
    const state = new ObjectState(user)
    state.properties.firstName.value = firstName

    // Act
    const act = () => state.reset()

    // Assert
    expect(state.properties.firstName.value).toBe(firstName)
    expect(state.isDirty).toBeTruthy()

    act()

    expect(state.properties.firstName.value).toBe('Spongebob')
    expect(state.isDirty).toBeFalsy()
  })

  it('should be able to access values', () => {
    // Arrange
    const state = new ObjectState(new User())

    // Act
    const values = state.values

    // Assert
    expect(values).toBeInstanceOf(StateValues)
  })

  describe('errors', () => {
    it('should be able to set/get errors', () => {
      // Arrange
      const state = new ObjectState(new User())
      const errors = ['Whoops']

      // Act
      const act = () => state.errors = errors

      // Assert
      expect(state.errors).toEqual([])
      act()
      expect(state.errors).toEqual(errors)
    })

    it('should be able to read hasErrors', () => {
      // Arrange
      const state = new ObjectState(new User())
      const errors = ['Whoops']

      // Act
      const act = () => state.errors = errors

      // Assert
      expect(state.hasErrors).toBeFalsy()
      act()
      expect(state.hasErrors).toBeTruthy()
    })

    it('should be able to clear errors', () => {
      // Arrange
      const state = new ObjectState(new User())
      const errors = ['Whoops']
      state.errors = errors

      // Act
      const act = () => state.clearErrors()

      // Assert
      expect(state.hasErrors).toBeTruthy()
      expect(state.errors).toBe(errors)
      act()
      expect(state.hasErrors).toBeFalsy()
      expect(state.errors).toEqual([])
    })
  })

  describe('new', () => {
    it('should be able to mark as new', () => {
      // Arrange
      const state = new ObjectState(new User())

      // Act
      const act = () => state.markAsNew()

      // Assert
      expect(state.isNew).toBeFalsy()
      act()
      expect(state.isNew).toBeTruthy()
    })

    it('should be set to false by clean', () => {
      // Arrange
      const state = new ObjectState(new User()).markAsNew()

      // Act
      const act = () => state.clean()

      // Assert
      expect(state.isNew).toBeTruthy()
      act()
      expect(state.isNew).toBeFalsy()
    })

    it('should not be set to false by reset', () => {
      // Arrange
      const state = new ObjectState(new User()).markAsNew()

      // Act
      const act = () => state.reset()

      // Assert
      expect(state.isNew).toBeTruthy()
      act()
      expect(state.isNew).toBeTruthy()
    })
  })

  describe('delete', () => {
    it('should be able to mark as deleted', () => {
      // Arrange
      const state = new ObjectState(new User())

      // Act
      const act = () => state.markAsDeleted()

      // Assert
      expect(state.isDeleted).toBeFalsy()
      act()
      expect(state.isDeleted).toBeTruthy()
    })

    it('should be set to false by reset', () => {
      // Arrange
      const state = new ObjectState(new User()).markAsDeleted()

      // Act
      const act = () => state.reset()

      // Assert
      expect(state.isDeleted).toBeTruthy()
      act()
      expect(state.isDeleted).toBeFalsy()
    })

    it('should not be set to false by clean', () => {
      // Arrange
      const state = new ObjectState(new User()).markAsDeleted()

      // Act
      const act = () => state.clean()

      // Assert
      expect(state.isDeleted).toBeTruthy()
      act()
      expect(state.isDeleted).toBeTruthy()
    })
  })
})
