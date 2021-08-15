export function suggest(txt: string, suggestions: string[] = []): string[] {
  return suggestions.filter((s) => s.toLowerCase().includes(txt.toLowerCase()))
}

export function highlited(
  text: string,
  typed: string,
  suggestionWrapPattern?: string,
) {
  const wrap = suggestionWrapPattern || '<b><u>$1</u></b>'
  return text.replace(new RegExp(`(${typed})`, 'gi'), wrap)
}

export function without<T>(arr: T[], el: T): T[] {
  return arr.filter((e) => e !== el)
}

export function moveCycled(pointer: number, step: number, totalCount: number) {
  let next = pointer
  if (!next && next !== 0) {
    next = -1
  }
  next = next + step
  if (next < 0) {
    next = totalCount - 1
  }

  if (next >= totalCount) {
    next = 0
  }
  return next
}
