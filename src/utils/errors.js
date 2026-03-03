/**
 * Custom error classes
 */
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message) {
      super(message, 400);
      this.name = 'ValidationError';
    }
  }
  
  class AuthenticationError extends AppError {
    constructor(message) {
      super(message, 401);
      this.name = 'AuthenticationError';
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message) {
      super(message, 404);
      this.name = 'NotFoundError';
    }
  }
  
  class ConflictError extends AppError {
    constructor(message) {
      super(message, 409);
      this.name = 'ConflictError';
    }
  }
  
  /**
   * Error handler
   */
  const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message
      });
    }
  
    // Unknown error
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  };
  
  module.exports = {
    AppError,
    ValidationError,
    AuthenticationError,
    NotFoundError,
    ConflictError,
    errorHandler
  };