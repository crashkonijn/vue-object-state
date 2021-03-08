# vue-object-state

A library that helps you keep track of changes in your dtos.

## Basic example

```TypeScript
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
```


