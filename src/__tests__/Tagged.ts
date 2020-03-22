import { without } from "../Tagged";

test("wihout", () => {
  expect(without([1, 2, 3], 2)).toStrictEqual([1, 3]);
});
