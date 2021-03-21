class InvalidUserLogin extends Error {
  constructor (errors) {
    super(errors)
    this.name = 'InvalidUserLogin'
    this.errors = errors
  }
}

export default InvalidUserLogin
