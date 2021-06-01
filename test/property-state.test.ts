import { describe, expect, it } from '@jest/globals'

import { PropertyState } from '../src/lib/property-state'

describe('PropertyState', () => {
  describe('value', () => {
    it('should correctly be initialized', () => {
      // Arrange
      const value = 'Eugene'

      // Act
      const state = new PropertyState('', value)

      // Assert
      expect(state.value).toBe(value)
    })

    it('should correctly set', () => {
      // Arrange
      const value = 'Eugene'
      const state = new PropertyState('', 'Spongebob')

      // Act
      state.value = value

      // Assert
      expect(state.value).toBe(value)
    })
  })

  describe('isDirty', () => {
    it('should correctly be initialized', () => {
      // Arrange
      const state = new PropertyState('', 'Eugene')

      // Assert
      expect(state.isDirty).toBe(false)
    })

    it('should become true', () => {
      // Arrange
      const state = new PropertyState('', 'Eugene')

      // Act
      state.value = 'Spongebob'

      // Assert
      expect(state.isDirty).toBe(true)
    })

    it.each([
      ['string', 'Eugene', 'Spongebob'],
      ['number', 0, 1],
      ['array', [], ['1']],
      ['date', new Date(), new Date('1942-11-30')],
    ])('should update correctly [%s]', (_type, a, b) => {
      // Arrange
      const state = new PropertyState('', a)

      // Act
      const makeDirty = () => state.value = b
      const makeClean = () => state.value = a

      // Assert
      expect(state.isDirty).toBe(false)
      makeDirty()
      expect(state.isDirty).toBe(true)
      makeClean()
      expect(state.isDirty).toBe(false)
    })
  })

  it('should be able to access key', () => {
    // Arrange
    const key = 'firstName'
    const state = new PropertyState(key, '')

    // Assert
    expect(state.key).toBe(key)
  })

  describe('errors', () => {
    it('should correctly be initialized', () => {
      // Arrange
      const state = new PropertyState('', 'Eugene')

      // Assert
      expect(state.errors).toEqual([])
      expect(state.hasErrors).toBe(false)
    })

    it('should correctly be updated', () => {
      // Arrange
      const state = new PropertyState('', 'Eugene')
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
      const state = new PropertyState('', 'Eugene')
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
      const state = new PropertyState('', 'Eugene')
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

    it('should be able to clear errors', () => {
      // Arrange
      const state = new PropertyState('', 'Eugene')
      const errors = ['Something wrong']
      state.errors = errors

      // Act
      const act = () => state.clearErrors()

      // Assert
      expect(state.hasErrors).toBe(true)
      expect(state.errors).toBe(errors)
      act()
      expect(state.hasErrors).toBe(false)
      expect(state.errors).toEqual([])
    })
  })
})
