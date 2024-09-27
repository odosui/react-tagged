import { highlited } from '../utils'

test('highlited should work', () => {
  expect(highlited('United', 'un')).toBe('<b><u>Un</u></b>ited')
  expect(highlited('United and', 'an')).toBe('United <b><u>an</u></b>d')
  expect(highlited('United and', 'd')).toBe(
    'Unite<b><u>d</u></b> an<b><u>d</u></b>',
  )
  expect(highlited('United', 'x')).toBe('United')
})
