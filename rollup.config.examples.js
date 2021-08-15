import ts from "@wessberg/rollup-plugin-ts";
import scss from 'rollup-plugin-scss'
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
    scss({
      output: 'examples/index.css'
    }),
    serve("examples"),
    livereload({
      watch: "examples/dist"
    })
  ]
};
