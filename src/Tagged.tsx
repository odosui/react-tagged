import * as React from 'react'
import { memo, useState, useEffect, useRef } from 'react'
import { suggest, highlited, without, moveCycled } from './utils'

export const INPUT_DEFAULT_PLACEHOLDER = 'Add new tag'

const SingleTag: React.FC<{ name: string; onDelete: () => void }> = memo(
  ({ name, onDelete }) => {
    const [classes, setClasses] = useState('react-tagged--tag-enter')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
      setClasses('react-tagged--tag-enter react-tagged--tag-enter-active')
    }, [])

    const elRef = useRef<HTMLDivElement>(null)

    const handleDelete: React.MouseEventHandler = (e) => {
      e.preventDefault()
      setClasses('react-tagged--tag-leave')
      setTimeout(() => {
        setClasses('react-tagged--tag-leave react-tagged--tag-leave-active')
        setDeleting(true)
      }, 10)
    }

    const handleTransitionEnd: React.TransitionEventHandler = ({ target }) => {
      if (target === elRef.current && deleting) {
        setDeleting(false)
        onDelete()
      }
    }

    return (
      <div
        className={`react-tagged--tag ${classes}`}
        onTransitionEnd={handleTransitionEnd}
        ref={elRef}
      >
        {name}
        <a href="#" onClick={handleDelete}>
          ×
        </a>
      </div>
    )
  },
)

export const Tagged: React.FC<{
  initialTags: string[]
  suggestions?: string[]
  onChange?: (tags: string[]) => void
  suggestionWrapPattern?: string
  allowCustom?: boolean
  inputPlaceholder?: string
  suggestionsThreshold?: number
  autoFocus?: boolean
}> = memo(
  ({
    initialTags,
    suggestions = [],
    onChange,
    suggestionWrapPattern,
    allowCustom = true,
    inputPlaceholder = INPUT_DEFAULT_PLACEHOLDER,
    suggestionsThreshold = 1,
    autoFocus = false,
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
      const nt = without(tags, tags[ind])
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
      onChange && onChange(nt)
    }

    const sug = filterSuggestions(
      typed,
      suggestionsThreshold,
      tags,
      suggestions,
    )

    const handleKeyPress = ({ key }: React.KeyboardEvent) => {
      if (key === 'Enter' && typed) {
        if (cursor > -1) {
          handleAdd(sug[cursor])
        } else {
          handleAdd(typed)
        }
      }
    }

    const moveCursor = (diff: 1 | -1) => {
      setCursor(moveCycled(cursor, diff, sug.length))
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

    return (
      <div className="react-tagged--tags">
        {tags.map((t, ind) => (
          <SingleTag name={t} key={t} onDelete={() => handleDelete(ind)} />
        ))}
        <div
          className={`react-tagged--tags-input-wrapper ${
            sug.length > 0 ? 'with-suggestions' : ''
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
          {sug.length > 0 && (
            <div className="react-tagged--tags-suggestions">
              {sug.map((s, ind) => (
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
