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
        <h3>Simple example with suggestions</h3>
        <Tagged initialTags={["Denmark", "Finland"]} suggestions={countries} />
        <Code>
          {`<Tagged
  initialTags={["Denmark", "Finland"]}
  suggestions={countries}
/>`}
        </Code>
      </div>
      <hr />
      <div>
        <h3>Forbid custom tags</h3>
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
      <hr />
      <div>
        <h3>Custom placeholder</h3>
        <Tagged
          initialTags={["Denmark"]}
          suggestions={countries}
          inputPlaceholder={"Press enter"}
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
          initialTags={["Denmark"]}
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
  );
};

function Code({ children }: { children: React.ReactChildren | string }) {
  return (
    <pre className="code">
      <code className="language-jsx">{children}</code>
    </pre>
  );
}
