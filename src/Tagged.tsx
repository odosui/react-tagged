import * as React from 'react'
import { memo, useEffect, useState } from 'react'
import Tag from './Tag'
import { highlited, moveCycled, suggest, without } from './utils'

export const INPUT_DEFAULT_PLACEHOLDER = 'Add new tag'

interface TaggedProps {
  initialTags: string[]
  suggestions?: string[]
  onChange?: (tags: string[]) => void
  suggestionWrapPattern?: string
  allowCustom?: boolean
  inputPlaceholder?: string
  suggestionsThreshold?: number
  autoFocus?: boolean
  reverse?: boolean
}

export const Tagged: React.FC<TaggedProps> = memo(
  ({
    initialTags,
    suggestions = [],
    onChange,
    suggestionWrapPattern,
    allowCustom = true,
    inputPlaceholder = INPUT_DEFAULT_PLACEHOLDER,
    suggestionsThreshold = 1,
    autoFocus = false,
    reverse = false,
  }) => {
    const [tags, setTags] = useState([] as string[])
    const [typed, setTyped] = useState('')
    const [cursor, setCursor] = useState(-1)

    useEffect(() => {
      setTags(initialTags)
    }, [initialTags])

    useEffect(() => {
      setCursor(-1)
    }, [typed])

    const handleDelete = (ind: number) => {
      if (!tags[ind]) {
        return
      }
      const nt = without(tags, tags[ind]!)
      setTags(nt)
      onChange && onChange(nt)
    }

    const handleAdd = (tagUntrimmed: string) => {
      const tag = (tagUntrimmed || '').trim()
      if (!tag) {
        return
      }

      if (!allowCustom && suggestions.indexOf(tag) === -1) {
        return
      }

      if (tags.indexOf(tag) > -1) {
        return
      }
      const nt = [...tags, tag]
      setTags(nt)
      setTyped('')
      setCursor(-1)
      onChange && onChange(nt)
    }

    const visibleSuggestions = filterSuggestions(
      typed,
      suggestionsThreshold,
      tags,
      suggestions,
    )

    const handleKeyPress = ({ key }: React.KeyboardEvent) => {
      if (key === 'Enter' && typed) {
        if (cursor > -1) {
          const addEl = visibleSuggestions[cursor]
          if (!addEl) {
            return
          }
          handleAdd(addEl)
        } else {
          handleAdd(typed)
        }
      }
    }

    const moveCursor = (diff: 1 | -1) => {
      setCursor(moveCycled(cursor, diff, visibleSuggestions.length))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const { key, keyCode } = e
      if (key === 'Escape' || key === 'Esc') {
        setTyped('')
      }

      if (keyCode === 38) {
        e.preventDefault()
        moveCursor(-1)
      } else if (keyCode === 40) {
        e.preventDefault()
        moveCursor(1)
      }
    }

    const tagsEl = tags.map((t, ind) => (
      <Tag name={t} key={t} onDelete={() => handleDelete(ind)} />
    ))

    const inputEl = (
      <div
        className={`react-tagged--tags-input-wrapper ${
          visibleSuggestions.length > 0 ? 'with-suggestions' : ''
        }`}
      >
        <input
          value={typed}
          type="text"
          placeholder={inputPlaceholder}
          onChange={({ target: { value } }) => {
            setTyped(value)
          }}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          className="react-tagged--input"
          autoFocus={autoFocus}
        />
        {visibleSuggestions.length > 0 && (
          <div className="react-tagged--tags-suggestions">
            {visibleSuggestions.map((s, ind) => (
              <div
                className={`react-tagged--tags-suggestions-item ${
                  cursor === ind ? 'selected' : ''
                }`}
                key={s}
                dangerouslySetInnerHTML={{
                  __html: highlited(s, typed, suggestionWrapPattern),
                }}
                onClick={() => handleAdd(s)}
              />
            ))}
          </div>
        )}
      </div>
    )

    if (reverse) {
      return (
        <div className="react-tagged--tags react-tagged--reveresed">
          {tagsEl}
          {inputEl}
        </div>
      )
    }

    return (
      <div className="react-tagged--tags">
        {inputEl}
        {tagsEl}
      </div>
    )
  },
)

function filterSuggestions(
  typed: string,
  suggestionsThreshold: number,
  tags: string[],
  suggestions: string[],
) {
  let sug: string[] = []
  if (typed && typed.trim().length >= suggestionsThreshold) {
    const trimed = typed.trim()
    if (trimed.length > 0) {
      sug = suggest(typed, suggestions).filter(
        (s) => tags.map((t) => t.toLowerCase()).indexOf(s.toLowerCase()) === -1,
      )
    } else {
      sug = suggestions
    }
    sug = sug.slice(0, 9)
  }
  return sug
}
