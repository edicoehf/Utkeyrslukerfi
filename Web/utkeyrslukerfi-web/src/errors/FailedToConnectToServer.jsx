class FailedToConnectToServer extends Error {
  constructor (errors) {
    super(errors)
    this.name = 'FailedToConnectToServer'
    this.errors = errors
  }
}

export default FailedToConnectToServer
