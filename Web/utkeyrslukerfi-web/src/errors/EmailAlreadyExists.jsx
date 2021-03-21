class EmailAlreadyExists extends Error {
  constructor (errors) {
    super(errors)
    this.name = 'EmailAlreadyExists'
    this.errors = errors
  }
}

export default EmailAlreadyExists
