export const MessageBodySizeLimit = 100

export const DegradedFileName = 'degraded.json'

export const ErrorCode = {
  MESSAGE_TOO_BIG: 'MESSAGE_TOO_BIG',
  FAILED_TO_WRITE: 'FAILED_TO_WRITE',
}

export const Errors = {
  [ErrorCode.MESSAGE_TOO_BIG]: `Message is too big, max supported is ${MessageBodySizeLimit} bytes.`,
  [ErrorCode.FAILED_TO_WRITE]: 'Failed to write degraded state in memory.',
}
