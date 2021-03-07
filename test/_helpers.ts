export class User {
  firstName!: string
  address!: Address

  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }
}

export class Address {
  street!: string

  constructor(init?: Partial<Address>) {
    Object.assign(this, init)
  }
}
