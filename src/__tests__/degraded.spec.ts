import { signalDegraded } from '../degraded'
import * as fs from 'fs'

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}))

describe('degraded', () => {
  beforeEach(() => jest.resetAllMocks())

  it('should generate degraded.json with message', () => {
    const customMessage = 'custom message'

    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false)
    jest.spyOn(fs, 'writeFileSync').mockImplementation()

    signalDegraded(customMessage)

    expect(fs.writeFileSync).toHaveBeenCalledWith('degraded.json', JSON.stringify({
      messages: [customMessage]
    }))
  })

  it('should cumulate messages when called multiple times', () => {
    const customMessage = 'custom message'
    const extraCustomMessage = 'extra custom message'

    jest.spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false)
      .mockReturnValue(true)
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify({ messages: [customMessage] }))
    jest.spyOn(fs, 'writeFileSync').mockImplementation()

    signalDegraded(customMessage)
    signalDegraded(extraCustomMessage)

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(fs.writeFileSync).toHaveBeenCalledWith('degraded.json', JSON.stringify({
      messages: [customMessage, extraCustomMessage],
    }))
  })

  it('should generate degraded without a message', () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false)
    jest.spyOn(fs, 'writeFileSync').mockImplementation()

    signalDegraded()

    expect(fs.writeFileSync).toHaveBeenCalledWith('degraded.json', JSON.stringify({
      messages: []
    }))
  })
})
