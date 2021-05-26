import { describe, expect, it } from '@jest/globals'

import { Address, User } from './helpers'
import { PropertiesState } from '../src/lib/properties-state'
import { PropertyState } from '../src/lib/property-state'
import StateValues from '../src/lib/state-values'
import { ObjectProperties } from '../src'

describe('StateValues', () => {
  it('should be able to access values', () => {
    // Arrange
    const firstName = 'Eugene'

    const props = {
      firstName: new PropertyState('', firstName)
    }
    const propertiesState = new PropertiesState('', new User, props as unknown as ObjectProperties<any>);

    // Act
    const values = StateValues.from(propertiesState, props as unknown as ObjectProperties<any>)

    // Assert
    expect(values.firstName).toBe(firstName)
  })

  it('should be able to access nested values', () => {
    // Arrange
    const street = 'Anchor Way'

    const addressProps = {
      street: new PropertyState('', street)
    }

    const userProps = {
      address: new PropertiesState('', new Address, addressProps as unknown as ObjectProperties<Address>)
    }
    const propertiesState = new PropertiesState('', new User, userProps as unknown as ObjectProperties<User>);

    // Act
    const values = StateValues.from(propertiesState, userProps as unknown as ObjectProperties<User>)

    // Assert
    expect(values.address.street).toBe(street)
  })

  it('should be able to update values', () => {
    // Arrange
    const firstName = 'Spongebob'

    const props = {
      firstName: new PropertyState('', 'Eugene')
    }

    const propertiesState = new PropertiesState<User>('', new User, props as unknown as ObjectProperties<User>);
    const values = StateValues.from(propertiesState, props as unknown as ObjectProperties<User>)

    // Act
    const act = () => values.firstName = firstName

    // Assert
    expect(values.firstName).toBe('Eugene')
    act()
    expect(values.firstName).toBe(firstName)

  })

  it('should be able to access its original propertiesState', () => {
    // Arrange
    const propertiesState = new PropertiesState<User>('', new User, { } as unknown as ObjectProperties<User>);
    const values = StateValues.from(propertiesState, { } as unknown as ObjectProperties<User>)

    // Act
    const result = values.propertiesState

    // Assert
    expect(result).toBe(propertiesState)

  })
})
