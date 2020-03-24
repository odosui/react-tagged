import * as React from "react";
import { memo, useState, useEffect } from "react";
import { suggest, highlited, without } from "./utils";

interface IProps {
  initialTags: string[];
  suggestions?: string[];
  onChange?: (tags: string[]) => void;
  suggestionWrapPattern?: string;
  allowCustom?: boolean;
  inputPlaceholder?: string;
}

export const INPUT_DEFAULT_PLACEHOLDER = "Add New Tag";

export const Tagged: React.FC<IProps> = memo(
  ({
    initialTags,
    suggestions,
    onChange,
    suggestionWrapPattern,
    allowCustom = true,
    inputPlaceholder = INPUT_DEFAULT_PLACEHOLDER
  }) => {
    const [tags, setTags] = useState([] as string[]);
    const [typed, setTyped] = useState("");

    useEffect(() => {
      setTags(initialTags);
    }, [initialTags]);

    const handleDelete = (ind: number) => {
      const nt = without(tags, tags[ind]);
      setTags(nt);
      onChange && onChange(nt);
    };

    const handleAdd = (tag: string) => {
      if (!allowCustom && (suggestions || []).indexOf(tag) === -1) {
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

    const handleKeyPress = ({ key }: React.KeyboardEvent) => {
      if (key === "Enter" && typed) {
        handleAdd(typed);
      }
    };

    const handleKeyDown = ({ key }: React.KeyboardEvent) => {
      if (key === "Escape" || key === "Esc") {
        setTyped("");
      }
    };

    const sug = typed
      ? suggest(typed, suggestions).filter(
          s => tags.map(t => t.toLowerCase()).indexOf(s.toLowerCase()) === -1
        )
      : [];

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
              {sug.map(s => (
                <div
                  className="react-tagged--tags-suggestions-item"
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
