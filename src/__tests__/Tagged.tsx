import * as React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Tagged } from "../Tagged";

/* const countries = [ */
/*   "Denmark", */
/*   "United Kingdom of Great Britain and Northern Ireland", */
/*   "Poland", */
/*   "Italy", */
/*   "Latvia" */
/* ]; */

test("renders tags", () => {
  const tags = ["this", "is"];
  const { getByText } = render(<Tagged initialTags={tags} />);

  tags.forEach(tag => {
    expect(getByText(tag)).toBeInTheDocument();
    expect(getByText(tag)).toHaveClass("react-tagged--tag");
  });
});

test("adds a typed tag", () => {
  const { getByText, getByPlaceholderText } = render(
    <Tagged initialTags={[]} />
  );
  const input = getByPlaceholderText("Add New Tag");
  fill(input, "first");
  pressEnter(input);
  expect(getByText("first")).toBeInTheDocument();

  fill(input, "second");
  pressEnter(input);
  expect(getByText("second")).toBeInTheDocument();
});

test("on Esc it clears the textbox and hides suggestions", () => {
  const { queryByText, getByPlaceholderText } = render(
    <Tagged initialTags={[]} suggestions={["test"]} />
  );
  const input = getByPlaceholderText("Add New Tag") as HTMLInputElement;
  fill(input, "t");
  expect(input.value).toBe("t");
  expect(queryByText("es")).toBeInTheDocument(); // in suggestions box

  pressEscape(input);
  expect(input.value).toBe("");
  expect(queryByText("es")).not.toBeInTheDocument(); // in suggestions box
});

test("filters suggestions by query", () => {
  /* const tags = ["initial", "tags"]; */
  /* const { queryByText, getByPlaceholderText } = render( */
  /*   <Tagged initialTags={tags} suggestions={countries} /> */
  /* ); */
  /* const input = getByPlaceholderText("Add New Tag"); */
  /* fireEvent.change(input, { target: { value: "den" } }); */
  /* ["Denmark"].forEach(s => { */
  /*   expect(queryByText(s)).toBeInTheDocument(); */
  /*   expect(queryByText(s)).toHaveClass("react-tagged--tags-suggestions-item"); */
  /* }); */
  /* [ */
  /*   "United Kingdom of Great Britain and Northern Ireland", */
  /*   "Poland", */
  /*   "Italy", */
  /*   "Latvia" */
  /* ].forEach(s => { */
  /*   expect(queryByText(s)).not.toBeInTheDocument(); */
  /* }); */
  /* fireEvent.change(input, { target: { value: "and" } }); */
  /* ["Poland", "United Kingdom of Great Britain and Northern Ireland"].forEach( */
  /*   s => { */
  /*     expect(queryByText(s)).toBeInTheDocument(); */
  /*     expect(queryByText(s)).toHaveClass("react-tagged--tags-suggestions-item"); */
  /*   } */
  /* ); */
  /* ["Denmark", "Italy", "Latvia"].forEach(s => { */
  /*   expect(queryByText(s)).not.toBeInTheDocument(); */
  /* }); */
});

test("adds a clicked on suggestion tag", () => {});

// UTILS

function pressEnter(input: HTMLElement) {
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
}

function pressEscape(input: HTMLElement) {
  fireEvent.keyDown(input, { key: "Escape", code: 27, charCode: 27 });
}

function fill(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } });
}

// TODO: arrows to move among suggestions
// TODO: Esc to clear the text input
// TODO: Don't show in suggestions what already typed
// TODO: Custom suggestion function
// TODO: suggestion debounce?
// TODO: placeholder for the input element
// TODO: suggest letters typed treshold
// TODO: highlighted override
// TODO: orientation: left / right (input -> tags, tags -> input)
// TODO: suggestions count
// TODO: sort alphabetically on add
// TODO: suggest on click into
