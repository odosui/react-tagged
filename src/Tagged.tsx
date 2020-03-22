import * as React from "react";
import { memo, useState, useEffect } from "react";

interface IProps {
  initialTags: string[];
  suggestions: string[];
  onChange: (tags: string[]) => void;
}

export const Tagged: React.FC<IProps> = memo(
  ({ initialTags, suggestions, onChange }) => {
    const [tags, setTags] = useState([] as string[]);
    const [typed, setTyped] = useState("");

    useEffect(() => {
      setTags(initialTags);
    }, [initialTags]);

    const sug = typed ? suggest(typed, suggestions) : [];

    const handleDelete = (ind: number) => {
      const nt = without(tags, tags[ind]);
      setTags(nt);
      onChange(nt);
    };

    const handleAdd = (tag: string) => {
      const nt = [...tags, tag];
      setTags(nt);
      setTyped("");
      onChange(nt);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && typed) {
        handleAdd(typed);
      }
    };

    return (
      <div className="candl-tags">
        {tags.map((t, ind) => (
          <div className="candl-tag" key={t}>
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
        <div className="candl-tags-input-wrapper">
          <input
            value={typed}
            type="text"
            placeholder="Add New Tag"
            onChange={({ target: { value } }) => {
              setTyped(value);
            }}
            onKeyPress={handleKeyPress}
          />
          {sug.length > 0 && (
            <div className="candl-tags-suggestions">
              {sug.map(s => (
                <div
                  className="candl-tags-suggestions-item"
                  key={s}
                  dangerouslySetInnerHTML={highlited(s, typed)}
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

function suggest(txt: string, suggestions: string[]): string[] {
  return suggestions
    .filter(s => s.toLowerCase().includes(txt.toLowerCase()))
    .slice(0, 9);
}

function highlited(text: string, typed: string) {
  return { __html: text.replace(typed, `<b><u>${typed}</u></b>`) };
}

// Utils
function without<T>(arr: T[], el: T) {
  return arr.filter(e => e !== el);
}
