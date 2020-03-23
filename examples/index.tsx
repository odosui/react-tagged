import * as React from "react";
import * as ReactDOM from "react-dom";

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
        <Code>
          {'<Tagged initialTags={["London", "Paris", "New-York"]} />'}
        </Code>
        <br />
        <Tagged initialTags={["Denmark"]} suggestions={countries} />
      </div>
    </div>
  );
};

function Code({ children }: { children: React.ReactChildren | string }) {
  return <pre className="code prettyprint">{children}</pre>;
}
