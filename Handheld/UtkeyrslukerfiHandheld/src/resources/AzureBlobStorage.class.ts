import Base64 from 'crypto-js/enc-base64';
import hmacSHA256 from 'crypto-js/hmac-sha256';

export interface BlobStorageConnectionOptions {
    account: String;
    container: String;
    key: String;
  }
  
  class AzureBlobStorage {
    private account: String;
    private container: String;
    private key: String;
  
    constructor(props: BlobStorageConnectionOptions) {
      this.account = props.account;
      this.container = props.container;
      this.key = props.key;
    }
  
    getKey() {
      return this.key;
    }
  
    getAccount() {
      return this.account;
    }
  
    getContainer() {
      return this.container;
    }

    /**
     * Return a URL for the blob
     *
     * @param {String} account Name of azure blob storage account 
     * @param {Strgin} container Name of container that the image should be uploaded to
     * @param {String} blob Name (and extension) of the blob (data to be uploaded)
     */
    getBlockBlobUrl(
      account: String,
      container: String,
      blob: String
    ) {
      return `https://${account}.blob.core.windows.net/${container}/${blob}`;
    }
  
    /**
     * Create blob block and send request
     *
     * Reference to the API:
     * https://docs.microsoft.com/en-us/rest/api/storageservices/put-blob
     *
     * @param {import('react-native-document-picker').DocumentPickerResponse} file
     * @param {String} fileName
     * @returns {Promise<String>} Name of file
     */
    async createBlockBlob(file: any, fileName: String) {
      const date = new Date();
      const account = this.getAccount();
      const container = this.getContainer();
      const method = 'PUT';
  
      const url = this.getBlockBlobUrl(account, container, fileName);
      const stringToSign = `PUT\n\n${file.type}\n\nx-ms-date:${date.toUTCString()}\n/${account}/${container}/${fileName}`

      const utf8 = require('utf8')
      const signature = Base64.stringify(hmacSHA256(utf8.encode(stringToSign), Base64.parse(this.getKey())));

      
      const requestHeaders: HeadersInit_ = new Headers();
      requestHeaders.set('Authorization', `SharedKey ${account}:${signature}`);
      requestHeaders.set('Content-Type', file.type);
      requestHeaders.set('Content-Length', file.fileSize);
      requestHeaders.set('x-ms-date', date.toUTCString());
    
      try {
        const res = await fetch(url, {
          method,
          headers: requestHeaders,
          body: file,
        });
  
        // Should be status code 201
        if (res.status === 201) {
          return fileName;
        } else {
          throw {
            message: `The response status wasn\'t the expected.\nExpected: 201\nReceived: ${res.status}`,
            response: res,
          };
        }
      } catch (err) {
        // TODO: implement error messages
        throw err;
      }
    }
  }
  
  export default AzureBlobStorage;