export default class HttpError extends Error {
    constructor(errorCode, errorMessage) {
      super(errorMessage);
      this.errorCode = errorCode;
    }
};