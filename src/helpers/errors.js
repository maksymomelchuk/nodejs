class NodeCustomError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends NodeCustomError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotFoundError extends NodeCustomError {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

class NotAuthorizedError extends NodeCustomError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  NotAuthorizedError,
  NodeCustomError,
}
