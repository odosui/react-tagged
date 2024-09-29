import type { Meta, StoryObj } from '@storybook/react'
import { Tagged } from '../src'
import { countries } from './helpers'

const meta = {
  title: 'Example/Tagged',
  component: Tagged,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialTags: {
      description: 'Initially selected tags',
      defaultValue: [],
    },
    suggestions: {
      description: 'A list of suggestions',
      defaultValue: [],
    },
    onChange: {
      description: 'Callback when tags change',
      action: 'onChange',
    },
    suggestionWrapPattern: {
      description: 'Pattern for wrapping suggestions',
      defaultValue: '<b><u>$1</u></b>',
    },
    allowCustom: {
      description: 'Allow users to add custom tags (not from suggestions)',
      defaultValue: true,
    },
    inputPlaceholder: {
      description: 'Placeholder for the input',
      defaultValue: 'Add new tag',
    },
    suggestionsThreshold: {
      description: 'Minimum number of characters before suggestions are shown',
      defaultValue: 1,
    },
    autoFocus: {
      description: 'Focus the input on mount',
      defaultValue: false,
    },
    reverse: {
      description: 'Reverse the order of tags and input',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Tagged>

export default meta
type Story = StoryObj<typeof meta>

export const SelectCountry: Story = {
  name: 'Select Country',
  args: {
    initialTags: ['Denmark'],
    suggestions: countries,
  },
}

export const CustomTagNotAllowed: Story = {
  name: 'Custom tags not allowed',
  args: {
    initialTags: ['Denmark'],
    suggestions: countries,
    allowCustom: false,
  },
}

export const CustomPlaceholder: Story = {
  args: {
    initialTags: ['Denmark'],
    suggestions: countries,
    inputPlaceholder: 'Press enter',
  },
}

export const SuggestionTreshold: Story = {
  args: {
    initialTags: ['Denmark'],
    suggestions: countries,
    suggestionsThreshold: 2,
  },
}

export const ReverseOrder: Story = {
  name: 'Tags go first, input last',
  args: {
    initialTags: ['Denmark'],
    suggestions: countries,
    reverse: true,
  },
}
