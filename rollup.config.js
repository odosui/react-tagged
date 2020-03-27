import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  external: ["react"],
  plugins: [
    ts(),
    postcss({
      extract: true,
      minimize: true
    }),
    terser()
  ]
};
