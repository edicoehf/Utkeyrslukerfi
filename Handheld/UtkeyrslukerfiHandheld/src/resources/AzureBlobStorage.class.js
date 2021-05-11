import Base64 from 'crypto-js/enc-base64'
import hmacSHA256 from 'crypto-js/hmac-sha256'

class AzureBlobStorage {
  constructor (account, container, key) {
    this.account = account
    this.container = container
    this.key = key
  }

  // Access key
  getKey () {
    return this.key
  }

  // Account name
  getAccount () {
    return this.account
  }

  // Container name
  getContainer () {
    return this.container
  }

  /**
   * Return a URL for the blob
   * @param {string} account Name of azure blob storage account
   * @param {string} container Name of container that the image should be uploaded to
   * @param {string} blob Name (and extension) of the blob (data to be uploaded)
   */
  getBlockBlobUrl (account, container, blob) {
    return `https://${account}.blob.core.windows.net/${container}/${blob}`
  }

  /**
   * Create blob block and send request
   *
   * Reference to the API:
   * https://docs.microsoft.com/en-us/rest/api/storageservices/put-blob
   *
   * @param {import('react-native-document-picker').DocumentPickerResponse} file
   * @param {string} fileName
   * @returns {Promise<string>} Name of file
   */
  async createBlockBlob (file, fileName) {
    // Set necessary values
    const date = new Date()
    const account = this.getAccount()
    const container = this.getContainer()
    const method = 'PUT'
    const url = this.getBlockBlobUrl(account, container, fileName)

    // Create signature string
    const stringToSign = `PUT\n\n${file.type}\n\nx-ms-date:${date.toUTCString()}\n/${account}/${container}/${fileName}`

    // Decrypt signature string using azure shared key
    const utf8 = require('utf8')
    const signature = Base64.stringify(hmacSHA256(utf8.encode(stringToSign), Base64.parse(this.getKey())))

    // Set appropriate headers
    const requestHeaders = new Headers()
    requestHeaders.set('Authorization', `SharedKey ${account}:${signature}`)
    requestHeaders.set('Content-Type', file.type)
    requestHeaders.set('Content-Length', file.fileSize)
    requestHeaders.set('x-ms-date', date.toUTCString())

    // Send request
    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body: file
    })

    // Should be status code 201
    if (res.status === 201) {
      return fileName
    } else {
      throw new Error(`The received status code wasn't the expected one.\nExpected: 201\nReceived: ${res.status}\nResponse: ${res}`)
    }
  }
}

export default AzureBlobStorage
