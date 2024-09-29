import type { Meta, StoryObj } from '@storybook/react'
import { Tagged } from '../'
import { countries, states } from './helpers'

const meta = {
  title: 'Example/Tagged',
  component: Tagged,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialTags: {
      description: 'Initial list of tags',
      defaultValue: [],
    },
  },
  // args: { initialTags: [] },
} satisfies Meta<typeof Tagged>

export default meta
type Story = StoryObj<typeof meta>

export const SelectState: Story = {
  name: 'Select US States',
  args: {
    initialTags: ['Nebraska', 'Nevada'],
    suggestions: states,
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
