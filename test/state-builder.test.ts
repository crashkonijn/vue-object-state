import { describe, expect, it } from '@jest/globals'

import { Address, User } from './helpers'
import { PropertiesState } from '../src/lib/properties-state'
import { PropertyState } from '../src/lib/property-state'
import { StateBuilder } from '../src/lib/state-builder'
import _ = require('lodash')

describe('StateBuilder', () => {
  it('should build properties correctly', () => {
    // Arrange
    const user = new User({
      firstName: 'Eugene'
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.firstName).toBeInstanceOf(PropertyState)
  })

  it('should build objects correctly', () => {
    // Arrange
    const user = new User({
      address: new Address({
        street: 'Anchor Way'
      })
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.address).toBeInstanceOf(PropertiesState)
  })

  it('should build null properties correctly', () => {
    // Arrange
    const user = new User({
      firstName: null
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.firstName).toBeInstanceOf(PropertyState)
  })

  it('should build undefined properties correctly', () => {
    // Arrange
    const user = new User({
      firstName: undefined
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.firstName).toBeInstanceOf(PropertyState)
  })

  it('should build array properties correctly', () => {
    // Arrange
    const user = new User({
      interests: ['Counting money']
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.interests).toBeInstanceOf(PropertyState)
  })

  it('should build date properties correctly', () => {
    // Arrange
    const user = new User({
      birthDate: new Date('1942-11-30')
    })

    // Act
    const state = new StateBuilder().build(user)

    // Assert
    expect(state.birthDate).toBeInstanceOf(PropertyState)
  })

  it('should not build private properties', () => {
    // Arrange
    const user = new User({})
    _.set(user, '_private', 'test')

    // Act
    const state = new StateBuilder().build(user)

    const test = _.get(state, '_private');

    // Assert
    expect(test).toBeUndefined()
  })
})
