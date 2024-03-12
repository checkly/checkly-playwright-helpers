import { ErrorCode, Errors } from '../constants'
import { markCheckAsDegraded } from '../degraded'
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

    markCheckAsDegraded(customMessage)

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

    markCheckAsDegraded(customMessage)
    markCheckAsDegraded(extraCustomMessage)

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(fs.writeFileSync).toHaveBeenCalledWith('degraded.json', JSON.stringify({
      messages: [customMessage, extraCustomMessage],
    }))
  })

  it('should generate degraded without a message', () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false)
    jest.spyOn(fs, 'writeFileSync').mockImplementation()

    markCheckAsDegraded()

    expect(fs.writeFileSync).toHaveBeenCalledWith('degraded.json', JSON.stringify({
      messages: []
    }))
  })

  it('should throw if message is too big', () => {
    const longCustomMessage = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    expect(() => markCheckAsDegraded(longCustomMessage)).toThrow(Errors[ErrorCode.MESSAGE_TOO_BIG])
  })
})
