import { humanReadableSize } from './utils'

test('caclulates bytes correctly', () => {
  expect(humanReadableSize(0)).toBe('0b')
  expect(humanReadableSize(1)).toBe('1b')
  expect(humanReadableSize(1000)).toBe('1kb')
  expect(humanReadableSize(1000000)).toBe('1mb')
  expect(humanReadableSize(1000000 / 2)).toBe('500kb')
  expect(humanReadableSize(10000000)).toBe('10mb')
  expect(humanReadableSize('string')).toBe('0b')
  expect(humanReadableSize(Infinity)).toBe('0b')
})
