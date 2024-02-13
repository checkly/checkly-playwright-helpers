import * as fs from 'fs'

export function signalDegraded (message?: string) {
  const fileName = 'degraded.json'
  const fileExists = fs.existsSync(fileName)
  const content = fileExists ? JSON.parse(fs.readFileSync(fileName, 'utf-8')) : {
    messages: []
  }

  try {
    message && content.messages.push(message)
    fs.writeFileSync(fileName, JSON.stringify(content))
  } catch (e) {
    console.error('Failed to write degraded state', e)
  }
}

// @TODO use APIResponse type
export function responseTime (response: any) {
  const timings = response?.timings?.() ?? {}
  return timings?.total ?? 0
}
