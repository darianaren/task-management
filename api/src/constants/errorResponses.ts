export const ERRORS = Object.freeze({
  BAD_REQUEST: Symbol(
    'The server could not understand the request due to invalid syntax. The client should modify the request before resubmitting.'
  ),
  UNAUTHORIZED: Symbol(
    'The client must authenticate itself to get the requested response. Typically used for invalid credentials or access without login.'
  ),
  FORBIDDEN: Symbol(
    'The server understood the request, but it refuses to authorize it. The client does not have permission to access the resource.'
  ),
  NOT_FOUND: Symbol(
    'The server cannot find the requested resource. This can happen if the endpoint does not exist or the resource is missing.'
  ),
  METHOD_NOT_ALLOWED: Symbol(
    'The HTTP method used is not allowed for the requested resource. For example, sending a `POST` request to an endpoint that only allows `GET`.'
  ),
  CONFLICT: Symbol(
    'The request could not be completed due to a conflict with the current state of the resource, such as when trying to create a duplicate entry.'
  ),
  INTERNAL_SERVER_ERROR: Symbol(
    'The server encountered an unexpected condition that prevented it from fulfilling the request. This is a generic error message for server issues.'
  ),
  NOT_IMPLEMENTED: Symbol(
    'The server does not support the functionality required to fulfill the request. This typically indicates that the server does not recognize the request method.'
  ),
  SERVICE_UNAVAILABLE: Symbol(
    'The server is currently unable to handle the request due to temporary overloading or maintenance of the server. Try again later.'
  ),
  GATEWAY_TIMEOUT: Symbol(
    'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.'
  )
});

export const ERROR_RESPONSES = Object.freeze({
  [ERRORS.BAD_REQUEST]: {
    code: 400,
    message: 'Bad Request'
  },
  [ERRORS.UNAUTHORIZED]: {
    code: 401,
    message: 'Unauthorized'
  },
  [ERRORS.FORBIDDEN]: {
    code: 403,
    message: 'Forbidden'
  },
  [ERRORS.NOT_FOUND]: {
    code: 404,
    message: 'Not Found'
  },
  [ERRORS.METHOD_NOT_ALLOWED]: {
    code: 405,
    message: 'Method Not Allowed'
  },
  [ERRORS.CONFLICT]: {
    code: 409,
    message: 'Conflict'
  },
  [ERRORS.INTERNAL_SERVER_ERROR]: {
    code: 500,
    message: 'Internal Server Error'
  },
  [ERRORS.NOT_IMPLEMENTED]: {
    code: 501,
    message: 'Not Implemented'
  },
  [ERRORS.SERVICE_UNAVAILABLE]: {
    code: 503,
    message: 'Service Unavailable'
  },
  [ERRORS.GATEWAY_TIMEOUT]: {
    code: 504,
    message: 'Gateway Timeout'
  }
});
