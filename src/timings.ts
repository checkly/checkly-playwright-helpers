// @TODO use APIResponse type
export function responseTime (response: any): number | null {
  const timings = response?.timings?.() ?? {}
  return timings?.total ?? null
}
