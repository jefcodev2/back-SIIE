class StandardResponse {
    constructor(success, message, data = null, status_code = 200, log = null) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.status_code = status_code;
      this.log = log;
    }
  
    toJSON() {
      return {
        success: this.success,
        message: this.message,
        data: this.data,
        status_code: this.status_code,
        log: this.log,
      };
    }
  }
  
  module.exports = StandardResponse;
  