import { describe, expect, it } from '@jest/globals'

import { Address, User } from './_helpers'
import { PropertiesState } from '../src/lib/properties-state'
import { PropertyState } from '../src/lib/property-state'
import { StateBuilder } from '../src/lib/state-builder'

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
})
