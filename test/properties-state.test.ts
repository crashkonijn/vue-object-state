import { describe, expect, it } from '@jest/globals'

import { User } from './helpers'
import { PropertiesState } from '../src/lib/properties-state'
import { PropertyState } from '../src/lib/property-state'
import { ObjectProperties } from '../src/lib/types'
import _ = require('lodash')
import StateValues from '../src/lib/state-values'

describe('PropertiesState', () => {
  it('should initialize clean', () => {
    // Arrange
    const properties = {
      firstName: {
        isDirty: false
      }
    }

    // Act
    const state = new PropertiesState('', properties, properties as unknown as ObjectProperties<any>)

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

    const state = new PropertiesState('', properties, properties as unknown as ObjectProperties<any>)

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
      firstName: new PropertyState('', '')
    }

    // Act
    const state = new PropertiesState('', properties, properties as unknown as ObjectProperties<any>) as unknown as ObjectProperties<User>

    // Assert
    expect(state.firstName).toBeInstanceOf(PropertyState)
  })

  it('should not try build private properties', () => {
    // Arrange
    const properties = {
      firstName: new PropertyState('', ''),
    }

    const state = new PropertiesState('', _.cloneDeep(properties), properties as unknown as ObjectProperties<any>) as unknown as ObjectProperties<User>

    // inject __ob__ -> vue observer
    _.set(state, '_properties.__ob__', {})

    // Act

    const result = state.build()

    // Assert
    expect(result).toHaveProperty('firstName')
    expect(result).not.toHaveProperty('__ob__')
  })

  it('should be able to access values', () => {
    // Arrange
    const state = new PropertiesState('', { }, { } as unknown as ObjectProperties<any>)

    // Act
    const values = state.values

    // Assert
    expect(values).toBeInstanceOf(StateValues)
  })

  it('should be able to access key', () => {
    // Arrange
    const key = 'address'

    // Act
    const state = new PropertiesState(key, { }, { } as unknown as ObjectProperties<any>)

    // Assert
    expect(state.key).toBe(key)
  })

  describe('errors', () => {
    it('should correctly be initialized', () => {
      // Arrange
      const state = new PropertiesState('', { }, { } as unknown as ObjectProperties<any>)

      // Assert
      expect(state.errors).toEqual([])
      expect(state.hasErrors).toBe(false)
    })

    it('should correctly be updated', () => {
      // Arrange
      const state = new PropertiesState('', { }, { } as unknown as ObjectProperties<any>)
      const errors = ['Something wrong']

      // Act
      const act = () => state.errors = errors

      // Assert
      expect(state.hasErrors).toBe(false)
      act()
      expect(state.errors).toBe(errors)
      expect(state.hasErrors).toBe(true)
    })

    it('should be empty after reset', () => {
      // Arrange
      const state = new PropertiesState('', { }, { } as unknown as ObjectProperties<any>)
      const errors = ['Something wrong']
      state.errors = errors

      // Act
      const act = () => state.reset()

      // Assert
      expect(state.hasErrors).toBe(true)
      expect(state.errors).toBe(errors)
      act()
      expect(state.hasErrors).toBe(false)
      expect(state.errors).toEqual([])
    })

    it('should be empty after clean', () => {
      // Arrange
      const state = new PropertiesState('', { }, { } as unknown as ObjectProperties<any>)
      const errors = ['Something wrong']
      state.errors = errors

      // Act
      const act = () => state.clean()

      // Assert
      expect(state.hasErrors).toBe(true)
      expect(state.errors).toBe(errors)
      act()
      expect(state.hasErrors).toBe(false)
      expect(state.errors).toEqual([])
    })

    it('hasErrors should be true with dirty childState', () => {
      // Arrange
      const properties = {
        firstName: new PropertyState('', '')
      }
      const state = new PropertiesState('', properties, properties as unknown as ObjectProperties<any>) as unknown as ObjectProperties<User>
      const errors = ['Something wrong']

      // Act
      const act = () => state.firstName.errors = errors

      // Assert
      expect(state.hasErrors).toBe(false)
      expect(state.errors).toEqual([])
      act()
      expect(state.hasErrors).toBe(true)
      expect(state.errors).toEqual([])
    })

    it('should properly clean with clearErrors', () => {
      // Arrange
      const props = {
        firstName: new PropertyState('firstName', '')
      }
      const state = new PropertiesState('', props, props as unknown as ObjectProperties<any>) as unknown as ObjectProperties<User>
      const errors = ['Something wrong']
      state.errors = errors
      state.firstName.errors = errors

      // Act
      const act = () => state.clean()

      // Assert
      expect(state.hasErrors).toBe(true)
      expect(state.errors).toBe(errors)
      expect(state.firstName.errors).toBe(errors)
      act()
      expect(state.hasErrors).toBe(false)
      expect(state.errors).toEqual([])
      expect(state.firstName.errors).toEqual([])
    })
  })
})
