import * as React from "react";
import * as ReactDOM from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Tagged } from "../src/index";

window.onload = () => {
  const el = document.querySelector("#app");
  ReactDOM.render(<App />, el);
};

const countries = [
  "Denmark",
  "United Kingdom of Great Britain and Northern Ireland",
  "Poland",
  "Italy",
  "Latvia"
];

const App: React.FC = () => {
  return (
    <div className="container">
      <div>
        <h4>Basic example</h4>
        <Tagged initialTags={["London", "Paris", "New-York"]} />
        <Code>
          {'<Tagged initialTags={["London", "Paris", "New-York"]} />'}
        </Code>
      </div>
      <hr />
      <div>
        <h4>Suggestions</h4>
        <Tagged initialTags={["Denmark"]} suggestions={countries} />
        <Code>
          {'<Tagged initialTags={["Denmark"]} suggestions={countries} />'}
        </Code>
        <br />
      </div>
    </div>
  );
};

function Code({ children }: { children: React.ReactChildren | string }) {
  return (
    <SyntaxHighlighter language="jsx" style={dark}>
      {children}
    </SyntaxHighlighter>
  );
}
