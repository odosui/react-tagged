import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './examples.scss'

import { Tagged } from '../src/index'

window.onload = () => {
  const el = document.getElementById('app')
  if (!el) {
    throw new Error('Root element not found')
  }
  // React 18+
  createRoot(el).render(<App />)
}

const countries = ['Denmark', 'Sweden', 'Finland', 'Poland', 'Italy', 'Latvia']

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const App: React.FC = () => {
  React.useEffect(() => {
    ;(window as any).Prism.highlightAll()
  })

  return (
    <div className="container">
      <div>
        <h3>Simple example with suggestions</h3>
        <Tagged
          initialTags={['Nebraska', 'Nevada']}
          suggestions={states}
          autoFocus
        />
        <Code>
          {`<Tagged
  initialTags={["Nebraska", "Nevada"]}
  suggestions={states}
/>`}
        </Code>
      </div>
      <hr />
      <div>
        <h3>Forbid custom tags + reverse</h3>
        <Tagged
          initialTags={['Denmark']}
          suggestions={countries}
          allowCustom={false}
          reverse
        />
        <Code>
          {`<Tagged
  initialTags={["Denmark"]}
  suggestions={countries}
  allowCustom={false}
  reverse
/>`}
        </Code>
      </div>
      <hr />
      <div>
        <h3>Custom placeholder</h3>
        <Tagged
          initialTags={['Denmark']}
          suggestions={countries}
          inputPlaceholder={'Press enter'}
        />
        <Code>
          {`<Tagged
  initialTags={["Denmark"]}
  suggestions={countries}
  inputPlaceholder={"Press enter"}
/>`}
        </Code>
      </div>
      <hr />
      <div>
        <h3>With suggestion treshold</h3>
        <Tagged
          initialTags={['Denmark']}
          suggestions={countries}
          suggestionsThreshold={2}
        />
        <Code>
          {`<Tagged
  initialTags={["Denmark"]}
  suggestions={countries}
  suggestionsThreshold={2}
/>`}
        </Code>
      </div>
    </div>
  )
}

const Code: React.FC<{
  children: string
}> = ({ children }) => {
  return (
    <pre className="code">
      <code className="language-jsx">{children}</code>
    </pre>
  )
}
