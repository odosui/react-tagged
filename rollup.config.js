import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'

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
    terser(),
    scss({
      output: 'dist/index.css',
      outputStyle: 'compressed'
    })
  ]
};
