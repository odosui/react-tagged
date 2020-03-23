import * as React from "react";
import * as ReactDOM from "react-dom";

import { Tagged } from "../src/index";

window.onload = () => {
  const el = document.querySelector("#app");
  ReactDOM.render(<App />, el);
};

const App: React.FC = () => {
  return (
    <div className="container">
      <hr />
      <div>
        <h1>Basic example</h1>
        <code>{"<Tagged initialTags={['New-York']} />"}</code>
        <br />
        <Tagged initialTags={["New-York"]} />
      </div>
      <hr />
    </div>
  );
};
