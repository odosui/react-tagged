import typescript from "@rollup/plugin-typescript";
import size from "rollup-plugin-size";
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
    typescript(),
    postcss({
      extract: true,
      minimize: true
    }),
    terser(),
    size()
  ]
};
