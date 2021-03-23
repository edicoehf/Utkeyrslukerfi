class NotFound extends Error {
  constructor (errors) {
    super(errors)
    this.name = 'NotFound'
    this.errors = errors
  }
}

export default NotFound
