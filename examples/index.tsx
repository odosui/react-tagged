import * as React from "react";
import * as ReactDOM from "react-dom";
import "./examples.scss";

import { Tagged } from "../src/index";

window.onload = () => {
  const el = document.querySelector("#app");
  ReactDOM.render(<App />, el);
};

const countries = ["Denmark", "Sweden", "Finland", "Poland", "Italy", "Latvia"];

const App: React.FC = () => {
  React.useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <div className="container">
      <div>
        <h4>Simple example with suggestions</h4>
        <Tagged initialTags={["Denmark"]} suggestions={countries} />
        <Code>
          {`<Tagged
  initialTags={["Denmark"]}
  suggestions={countries}
/>`}
        </Code>
      </div>
      <hr />
      <div>
        <h4>Forbid custom tags</h4>
        <Tagged
          initialTags={["Denmark"]}
          suggestions={countries}
          allowCustom={false}
        />
        <Code>
          {`<Tagged
  initialTags={["Denmark"]}
  suggestions={countries}
  allowCustom={false}
/>`}
        </Code>
      </div>
    </div>
  );
};

function Code({ children }: { children: React.ReactChildren | string }) {
  return (
    <pre className="code">
      <code className="language-jsx">{children}</code>
    </pre>
  );
}
