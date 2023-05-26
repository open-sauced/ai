import { assert, expect, test } from 'vitest'
import { getRelativeDays } from '../../src/utils/dateUtils'


test('getRelativeDays', () => {
    expect(getRelativeDays(0)).toBe('-')
    expect(getRelativeDays(1)).toBe('1d')
    expect(getRelativeDays(30)).toBe('30d')
    expect(getRelativeDays(31)).toBe('1mo')
    expect(getRelativeDays(32)).toBe('1mo')
    expect(getRelativeDays(365)).toBe('1y')
    expect(getRelativeDays(366)).toBe('1y')
    expect(getRelativeDays(365 * 2)).toBe('2y')
    expect(getRelativeDays(365 * 2 + 1)).toBe('2y')
})