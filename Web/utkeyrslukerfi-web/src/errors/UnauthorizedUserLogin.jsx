class UnauthorizedUserLogin extends Error {
  constructor (errors) {
    super(errors)
    this.name = 'UnauthorizedUserLogin'
    this.errors = errors
  }
}

export default UnauthorizedUserLogin
