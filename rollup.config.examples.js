import ts from "@wessberg/rollup-plugin-ts";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "examples/index.tsx",
  output: {
    dir: "examples/dist",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    ts(),
    postcss({
      extract: true
    }),
    serve("examples"),
    livereload({
      watch: "examples/dist"
    })
  ]
};
