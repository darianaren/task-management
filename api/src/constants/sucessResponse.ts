export const SUCCESS = Object.freeze({
  OK: Symbol(
    'The request was processed successfully and the server is returning the requested data.'
  ),
  CREATED: Symbol(
    'A new resource was created as a result of the request. Typically used for POST requests.'
  ),
  ACCEPTED: Symbol(
    'The request has been accepted, but the processing has not been completed. Used for asynchronous processes.'
  ),
  NO_CONTENT: Symbol(
    'The request was processed successfully, but there is no content to return. Common in DELETE requests.'
  ),
  RESET_CONTENT: Symbol(
    'The server has successfully processed the request, but the client should reset the document view.'
  ),
  PARTIAL_CONTENT: Symbol(
    'The server is delivering partial content, typically when a Range header is included in the request.'
  )
});

export const SUCCESS_RESPONSES = {
  [SUCCESS.OK]: {
    code: 200,
    message: 'Request was successful'
  },
  [SUCCESS.CREATED]: {
    code: 201,
    message: 'Resource created successfully'
  },
  [SUCCESS.ACCEPTED]: {
    code: 202,
    message: 'Request has been accepted for processing'
  },
  [SUCCESS.NO_CONTENT]: {
    code: 204,
    message: 'No content'
  },
  [SUCCESS.RESET_CONTENT]: {
    code: 205,
    message: 'Reset content'
  },
  [SUCCESS.PARTIAL_CONTENT]: {
    code: 206,
    message: 'Partial content delivered'
  }
};
