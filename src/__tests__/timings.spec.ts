import { getAPIResponseTime } from '../timings'

describe('timings', () => {
  it('should get timings from request', () => {
    const TIMING = 100

    const mockResponse = {
      timings () {
        return { total: TIMING }
      }
    } as any

    expect(getAPIResponseTime(mockResponse)).toEqual(TIMING)
  })

  it('should return null if timings not defined', () => {
    expect(getAPIResponseTime({} as any)).toBeNull()
  })
})
