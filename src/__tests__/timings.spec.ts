import { responseTime } from '../timings'

describe('timings', () => {
  it('should get timings from request', () => {
    const TIMING = 100

    const mockResponse = {
      timings () {
        return { total: TIMING }
      }
    }

    expect(responseTime(mockResponse)).toEqual(TIMING)
  })

  it('should return null if timings not defined', () => {
    expect(responseTime({})).toBeNull()
  })
})
