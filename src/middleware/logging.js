function logRequest(req, res, next) {
    console.log(`${new Date()} - ${req.method} request to ${req.url}`);
    next();
  }
  
  module.exports = logRequest;
  