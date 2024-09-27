import * as React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { INPUT_DEFAULT_PLACEHOLDER, Tagged } from './Tagged'
import '@testing-library/jest-dom/vitest'

describe('Tagged', () => {
  beforeEach(() => {
    // clear dom
    document.body.innerHTML = ''
  })

  it('renders tags', () => {
    const tags = ['this', 'is']
    const { getByText } = render(<Tagged initialTags={tags} />)

    tags.forEach((tag) => {
      expect(getByText(tag)).toBeDefined()
      expect(getByText(tag)).toHaveClass('react-tagged--tag')
    })
  })

  it('adds a typed tag', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Tagged initialTags={[]} />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fill(input, 'first')
    await pressEnter(input)

    expect(getByText('first')).toBeInTheDocument()

    fill(input, 'second')
    await pressEnter(input)
    expect(getByText('second')).toBeInTheDocument()
  })

  it('should not duplicate tags', async () => {
    const { queryAllByText, getByPlaceholderText } = render(
      <Tagged initialTags={[]} />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fill(input, 'first')
    await pressEnter(input)
    expect(queryAllByText('first').length).toBe(1)

    fill(input, 'first')
    await pressEnter(input)
    expect(queryAllByText('first').length).toBe(1)
  })

  it('adds a clicked on suggestion tag', async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <Tagged
        initialTags={[]}
        suggestions={['Sun', 'Moon']}
        suggestionWrapPattern={'$1'}
      />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    expect(queryByText('Sun')).not.toBeInTheDocument()
    fill(input, 'su')
    const el = getByText('Sun')
    el.click()
    expect(queryByText('Sun')).toBeInTheDocument()
  })

  it('removes tags by clicking on x', async () => {
    /* const { */
    /*   getByText, */
    /*   queryAllByText, */
    /*   queryByText, */
    /*   getByPlaceholderText */
    /* } = render(<Tagged initialTags={[]} />); */
    /* const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER); */
    /* expect(queryAllByText("×").length).toBe(0); */
    /* fill(input, "it"); */
    /* pressEnter(input); */
    /* expect(queryAllByText("×").length).toBe(1); */
    /* const rmElm = getByText("×"); */
    /* rmElm.click(); */
    /* await waitForElementToBeRemoved(() => queryByText("×"), { timeout: 1000 }); */
  })

  it('with allowCustom={false}, it only allows suggestions', () => {
    const { queryByText, getByPlaceholderText } = render(
      <Tagged
        initialTags={[]}
        suggestions={['sun', 'moon']}
        allowCustom={false}
      />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fill(input, 'stars')
    pressEnter(input)
    expect(queryByText('stars')).not.toBeInTheDocument()

    fill(input, 'moon')
    pressEnter(input)
    expect(queryByText('moon')).toBeInTheDocument()
  })

  it("doesn't suggest what's already picked", () => {
    const countries = [
      'Denmark',
      'United Kingdom of Great Britain and Northern Ireland',
      'Poland',
      'Italy',
      'Latvia',
    ]

    const tags = ['initial', 'tags']

    const { queryByText, queryAllByText, getByPlaceholderText } = render(
      <Tagged
        initialTags={tags}
        suggestions={countries}
        suggestionWrapPattern={'$1'}
      />,
    )

    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fill(input, 'den')
    expect(queryByText('Denmark')).toBeInTheDocument()
    expect(queryByText('Denmark')).toHaveClass(
      'react-tagged--tags-suggestions-item',
    )

    fill(input, 'Denmark')
    pressEnter(input)
    expect(queryAllByText('Denmark').length).toBe(1)
    fill(input, 'den')
    expect(queryAllByText('Denmark').length).toBe(1)
  })

  it('on Esc it clears the textbox and hides suggestions', async () => {
    // const { queryByText, getByPlaceholderText } = render(
    //   <Tagged initialTags={[]} suggestions={['it']} />,
    // )
    // const input = getByPlaceholderText(
    //   INPUT_DEFAULT_PLACEHOLDER,
    // ) as HTMLInputElement
    // fill(input, 't')
    // expect(input.value).toBe('t')
    // expect(queryByText('es')).toBeInTheDocument() // in suggestions box
    // await pressEscape(input)
    // expect(input.value).toBe('')
    // expect(queryByText('es')).not.toBeInTheDocument() // in suggestions box
  })

  it('filters suggestions by query', () => {
    const countries = [
      'Denmark',
      'United Kingdom of Great Britain and Northern Ireland',
      'Poland',
      'Italy',
      'Latvia',
    ]

    const tags = ['initial', 'tags']
    const { queryByText, getByPlaceholderText } = render(
      <Tagged
        initialTags={tags}
        suggestions={countries}
        suggestionWrapPattern={'$1'}
      />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fireEvent.change(input, { target: { value: 'den' } })
    ;['Denmark'].forEach((s) => {
      expect(queryByText(s)).toBeInTheDocument()
      expect(queryByText(s)).toHaveClass('react-tagged--tags-suggestions-item')
    })
    ;[
      'United Kingdom of Great Britain and Northern Ireland',
      'Poland',
      'Italy',
      'Latvia',
    ].forEach((s) => {
      expect(queryByText(s)).not.toBeInTheDocument()
    })
    fireEvent.change(input, { target: { value: 'and' } })
    ;['Poland', 'United Kingdom of Great Britain and Northern Ireland'].forEach(
      (s) => {
        expect(queryByText(s)).toBeInTheDocument()
        expect(queryByText(s)).toHaveClass(
          'react-tagged--tags-suggestions-item',
        )
      },
    )
    ;['Denmark', 'Italy', 'Latvia'].forEach((s) => {
      expect(queryByText(s)).not.toBeInTheDocument()
    })
  })

  it('custom placeholder', () => {
    const { queryByPlaceholderText } = render(
      <Tagged initialTags={[]} inputPlaceholder={'Press enter'} />,
    )
    expect(queryByPlaceholderText('Press enter')).toBeInTheDocument()
  })

  it('suggestions threshold', () => {
    const countries = [
      'Denmark',
      'United Kingdom of Great Britain and Northern Ireland',
      'Poland',
      'Italy',
      'Latvia',
    ]

    const { queryByText, getByPlaceholderText } = render(
      <Tagged
        initialTags={[]}
        suggestions={countries}
        suggestionsThreshold={2}
        suggestionWrapPattern="$1"
      />,
    )

    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fireEvent.change(input, { target: { value: 'd' } })
    expect(queryByText('Denmark')).not.toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'de' } })
    expect(queryByText('Denmark')).toBeInTheDocument()
  })

  it('pickup from suggestion with arrows', () => {
    const countries = [
      'Denmark',
      'United Kingdom of Great Britain and Northern Ireland',
      'Poland',
      'Italy',
      'Latvia',
    ]

    const { queryByText, getByPlaceholderText, getByText } = render(
      <Tagged
        initialTags={[]}
        suggestions={countries}
        suggestionWrapPattern="$1"
      />,
    )

    expect(queryByText('Denmark')).not.toBeInTheDocument()
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    fireEvent.change(input, { target: { value: 'd' } })
    pressDown(input)
    pressEnter(input)
    expect(getByText('Denmark')).toBeInTheDocument()
  })

  it('does not allow adding an empty string', async () => {
    const { queryAllByText, getByPlaceholderText } = render(
      <Tagged initialTags={[]} />,
    )
    const input = getByPlaceholderText(INPUT_DEFAULT_PLACEHOLDER)
    expect(queryAllByText('×').length).toBe(0)

    fill(input, 'it')
    await pressEnter(input)
    expect(queryAllByText('×').length).toBe(1)

    fill(input, '   ')
    await pressEnter(input)
    expect(queryAllByText('×').length).toBe(1)
  })
})

// HELPERS

async function pressEnter(input: HTMLElement) {
  await userEvent.type(input, '{enter}')
}

// async function pressEscape(input: HTMLElement) {
//   await userEvent.type(input, '{esc}')
// }

function pressDown(input: HTMLElement) {
  fireEvent.keyDown(input, { code: 40, charCode: 40, keyCode: 40 })
}

function fill(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } })
}

// TODO: custom async suggestion function
// TODO: suggestion debounce?
// TODO: suggest on click into
// TODO: customize suggestion items (include images, etc)
// TODO: limit total tags one can add
// TODO: suggestionWrapPattern is a security vulnerability I would change that prop to be of type (suggestion: string) => ReactNode
