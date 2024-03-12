import * as fs from 'fs'
import { ErrorCode, DegradedFileName, Errors, MessageBodySizeLimit } from './constants'

export function markCheckAsDegraded (message?: string) {
  const internalMessage = message && String(message)

  if (internalMessage && Buffer.byteLength(internalMessage, 'utf-8') >= MessageBodySizeLimit) {
    throw new Error(Errors[ErrorCode.MESSAGE_TOO_BIG])
  }

  const fileExists = fs.existsSync(DegradedFileName)

  const content = fileExists ? JSON.parse(fs.readFileSync(DegradedFileName, 'utf-8')) : {
    messages: []
  }

  try {
    internalMessage && content.messages.push(internalMessage)
    fs.writeFileSync(DegradedFileName, JSON.stringify(content))
  } catch (e) {
    console.error(Errors[ErrorCode.FAILED_TO_WRITE], e)
  }
}
