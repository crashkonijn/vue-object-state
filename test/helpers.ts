export class User {
  firstName!: string | null
  address!: Address
  birthDate!: Date
  interests!: string[]

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
