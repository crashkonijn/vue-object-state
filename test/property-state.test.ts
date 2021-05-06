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
      // ['string', 'Eugene', 'Spongebob'],
      ['number', 0, 1],
      // ['array', [], ['1']],
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
})
