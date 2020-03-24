import * as React from "react";
import { memo, useState, useEffect } from "react";
import { suggest, highlited, without, moveCycled } from "./utils";

export const INPUT_DEFAULT_PLACEHOLDER = "Add New Tag";

interface IProps {
  initialTags: string[];
  suggestions?: string[];
  onChange?: (tags: string[]) => void;
  suggestionWrapPattern?: string;
  allowCustom?: boolean;
  inputPlaceholder?: string;
  suggestionsThreshold?: number;
}

export const Tagged: React.FC<IProps> = memo(
  ({
    initialTags,
    suggestions = [],
    onChange,
    suggestionWrapPattern,
    allowCustom = true,
    inputPlaceholder = INPUT_DEFAULT_PLACEHOLDER,
    suggestionsThreshold = 1
  }) => {
    const [tags, setTags] = useState([] as string[]);
    const [typed, setTyped] = useState("");
    const [cursor, setCursor] = useState(-1);

    useEffect(() => {
      setTags(initialTags);
    }, [initialTags]);

    useEffect(() => {
      setCursor(-1);
    }, [typed]);

    const handleDelete = (ind: number) => {
      const nt = without(tags, tags[ind]);
      setTags(nt);
      onChange && onChange(nt);
    };

    const handleAdd = (tag: string) => {
      if (!allowCustom && suggestions.indexOf(tag) === -1) {
        return;
      }

      if (tags.indexOf(tag) > -1) {
        return;
      }
      const nt = [...tags, tag];
      setTags(nt);
      setTyped("");
      onChange && onChange(nt);
    };

    const sug = filterSuggestions(
      typed,
      suggestionsThreshold,
      tags,
      suggestions
    );

    const handleKeyPress = ({ key }: React.KeyboardEvent) => {
      if (key === "Enter" && typed) {
        if (cursor > -1) {
          handleAdd(sug[cursor]);
        } else {
          handleAdd(typed);
        }
      }
    };

    const moveCursor = (diff: 1 | -1) => {
      setCursor(moveCycled(cursor, diff, sug.length));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const { key, keyCode } = e;
      if (key === "Escape" || key === "Esc") {
        setTyped("");
      }

      if (keyCode === 38) {
        e.preventDefault();
        moveCursor(-1);
      } else if (keyCode === 40) {
        e.preventDefault();
        moveCursor(1);
      }
    };

    return (
      <div className="react-tagged--tags">
        {tags.map((t, ind) => (
          <div className="react-tagged--tag" key={t}>
            {t}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleDelete(ind);
              }}
            >
              ×
            </a>
          </div>
        ))}
        <div
          className={`react-tagged--tags-input-wrapper ${
            sug.length > 0 ? "with-suggestions" : ""
          }`}
        >
          <input
            value={typed}
            type="text"
            placeholder={inputPlaceholder}
            onChange={({ target: { value } }) => {
              setTyped(value);
            }}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            className="react-tagged--input"
          />
          {sug.length > 0 && (
            <div className="react-tagged--tags-suggestions">
              {sug.map((s, ind) => (
                <div
                  className={`react-tagged--tags-suggestions-item ${
                    cursor === ind ? "selected" : ""
                  }`}
                  key={s}
                  dangerouslySetInnerHTML={{
                    __html: highlited(s, typed, suggestionWrapPattern)
                  }}
                  onClick={() => handleAdd(s)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

function filterSuggestions(
  typed: string,
  suggestionsThreshold: number,
  tags: string[],
  suggestions: string[]
) {
  let sug: string[] = [];
  if (typed && typed.trim().length >= suggestionsThreshold) {
    const trimed = typed.trim();
    if (trimed.length > 0) {
      sug = suggest(typed, suggestions).filter(
        s => tags.map(t => t.toLowerCase()).indexOf(s.toLowerCase()) === -1
      );
    } else {
      sug = suggestions;
    }
    sug = sug.slice(0, 9);
  }
  return sug;
}
