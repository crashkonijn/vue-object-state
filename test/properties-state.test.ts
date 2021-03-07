import { describe, expect, it } from '@jest/globals'

import { User } from './_helpers'
import { PropertiesState } from '../src/lib/properties-state'
import { PropertyState } from '../src/lib/property-state'
import { ObjectProperties } from '../src/lib/types'

describe('PropertiesState', () => {
  it('should initialize clean', () => {
    // Arrange
    const properties = {
      firstName: {
        isDirty: false
      }
    }

    // Act
    const state = new PropertiesState(properties, properties as unknown as ObjectProperties<any>)

    // Assert
    expect(state.isDirty).toBeFalsy()
  })

  it('should become dirty', () => {
    // Arrange
    const properties = {
      firstName: {
        isDirty: false
      }
    }

    const state = new PropertiesState(properties, properties as unknown as ObjectProperties<any>)

    // Act
    const act = () => properties.firstName.isDirty = true

    // Assert
    expect(state.isDirty).toBeFalsy()
    act()
    expect(state.isDirty).toBeTruthy()
  })

  it('should define dynamic properties', () => {
    // Arrange
    const properties = {
      firstName: new PropertyState('')
    }

    // Act
    const state = new PropertiesState(properties, properties as unknown as ObjectProperties<any>) as unknown as ObjectProperties<User>

    // Assert
    expect(state.firstName).toBeInstanceOf(PropertyState)
  })
})
