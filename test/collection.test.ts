import { describe, expect, it } from '@jest/globals'
import { User } from './_helpers'
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
})
