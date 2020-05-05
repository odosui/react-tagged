# react-tagged

A minimalistic React tags component

<a href="https://bundlephobia.com/result?p=react-tagged@latest" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/react-tagged@latest" />
  </a>
<a href="https://github.com/hiquest/react-tagged/actions?query=workflow%3ATests" target="\_parent">
  <img alt="Tests" src="https://github.com/hiquest/react-tagged/workflows/Tests/badge.svg" />
</a>
<a href="https://twitter.com/janis_t" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/janis_t.svg?style=social&label=Follow" />
</a>

![Tagged in action](preview.gif)

# Features

💾 **1.2KB** GZipped

🔋 TypeScript declarations included

⌨ Keyboard shortcuts (using arrows to pick suggestions, etc.)

😍 Fully-customizable look (including animations) via CSS

# Installation

```bash
npm install --save react-tagged

# or
yarn add react-tagged
```

# Usage

```tsx
import { Tagged } from 'react-tagged'
import 'react-tagged/dist/index.css' // styles

<Tagged
  initialTags={[]}                          // initial tags (array of strings)
  suggestions={[]}                          // suggestions (array of strings)
  onChange={(tags) => {}}                   // called every a tag is added or removed, tags is an array of strings
  suggestionWrapPattern="<b><u>$1</u></b>"  // how to highlight search pattern in suggestions
  allowCustom={true}                        // when false, it will only allow tags from suggestions
  inputPlaceholder="Add new tag"            // the input placeholder
  suggestionsThreshold={1}                  // how many characters typed before suggestions appear
  autoFocus={false}                         // put focus into the input field
  reverse={false}                           // what should go first: tags or the input
/>
```

# F.A.Q.

## How to customize how it looks?

Simply override the CSS classes. Changing the tag background, for instance, is as easy as

```css
.react-tagged--tag {
  background-color: orange;
}
```

## How to override the default animations?

The default transition is applied to the `max-width` of a tag. There are four CSS classes that handle CSS transitions on tag appear and on tag leave. Override those to change it.

```css
.react-tagged--tag-enter {
  transition: max-width 0.2s ease-out;
  max-width: 0;
}

.react-tagged--tag-enter.react-tagged--tag-enter-active {
  max-width: 100px;
}

.react-tagged--tag-leave {
  transition: max-width 0.2s ease-in;
  max-width: 100px;
}

.react-tagged--tag-leave.react-tagged--tag-leave-active {
  max-width: 0;
}
```
