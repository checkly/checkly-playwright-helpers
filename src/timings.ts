import { APIResponse, Timings } from './types'

export function getAPIResponseTime (response: APIResponse): number | null {
  const timings: Timings = response?.timings?.() ?? {}
  return timings?.total ?? null
}
