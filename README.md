# vue-object-state

[![NPM version](https://img.shields.io/npm/v/vue-object-state.svg)](https://www.npmjs.com/package/vue-object-state)
[![Codecov](https://img.shields.io/codecov/c/github/crashkonijn/vue-object-state.svg)](https://codecov.io/gh/crashkonijn/vue-object-state)
[![CircleCI](https://img.shields.io/circleci/project/github/crashkonijn/vue-object-state.svg)](https://circleci.com/gh/crashkonijn/vue-object-state)

A typescript library that helps you keep track of changes in your dtos

## Basic example

```typescript
const user = new User({
  firstName: 'Eugene',
  address: new Address({
    street: 'Anchor Way'
  })
})

// Create a  new state object
const state = new ObjectState(user)

// You can read the state of every sub object and property (typed)
state.isDirty // false
state.properties.firstName.isDirty // false
state.properties.firstName.value // Eugene
state.properties.address.isDirty // false
state.properties.address.street.isDirty // false
state.properties.address.street.value // Anchor Way

// Update any of the properties
state.properties.firstName.value = 'Spongebob'

// It's state is updated, including vue binding
state.isDirty // true
state.properties.firstName.isDirty // true
state.properties.firstName.value // Spongebob
state.properties.address.isDirty // false
state.properties.address.street.isDirty // false
state.properties.address.street.value // Anchor Way

// To retrieve back your object, build the state
const result = state.build()
result instanceof User // true
result.firstName // Spongebob
result.address instanceof Address // true
result.address.street // Anchor Way

// Use the `clean()` method to clear dirty flags. This can be useful after a save, all 'original' values will be set to their current values.
state.properties.clean()
state.properties.firstName.clean()
state.clean()

// Use the `reset()` method to reset dirty values. This will revert everything to their original value.
state.properties.reset()
state.properties.firstName.reset()
state.reset()
```

## Collection
```typescript
const users = [
  new User({ firstName: 'Spongebob' }),
  new User({ firstName: 'Eugene' })
]

// Create a new collection object
const collection = new CollectionState(users) // CollectionState<User>

collection.count // 2
collection.elements // ObjectState<User>[]
collection.dirtyElements // ObjectState<User>[]
collection.get(0) // ObjectState<User>
collection.add(new User({ firstName: 'Patrick' }))
collection.clean() // calls clean on every element
collection.reset() // calls reset on every element
collection.build() // User[]
```
