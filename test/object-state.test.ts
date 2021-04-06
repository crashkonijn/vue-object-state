import { describe, expect, it } from '@jest/globals'

import { Address, User } from './_helpers'
import { ObjectState } from '../src/lib/object-state'
import { PropertiesState } from '../src/lib/properties-state'

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
})
