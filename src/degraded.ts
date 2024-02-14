import * as fs from 'fs'
import { DEGRADED_FILE_NAME, MESSAGE_BODY_SIZE_LIMIT } from './constants'

export function signalDegraded (message?: string) {
  const internalMessage = message && String(message)

  if (internalMessage && Buffer.byteLength(internalMessage, 'utf-8') >= MESSAGE_BODY_SIZE_LIMIT) {
    throw new Error('message is too big')
  }

  const fileExists = fs.existsSync(DEGRADED_FILE_NAME)

  const content = fileExists ? JSON.parse(fs.readFileSync(DEGRADED_FILE_NAME, 'utf-8')) : {
    messages: []
  }

  try {
    internalMessage && content.messages.push(internalMessage)
    fs.writeFileSync(DEGRADED_FILE_NAME, JSON.stringify(content))
  } catch (e) {
    console.error('Failed to write degraded state', e)
  }
}
