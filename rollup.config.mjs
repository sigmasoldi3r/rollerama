import commonjs from "@rollup/plugin-commonjs";
import { readFile } from "fs/promises";
import peg from "peggy";
import resolve from "@rollup/plugin-node-resolve";

/** @returns {import('rollup').Plugin} */
function peggy() {
  return {
    name: "peggy",
    async load(id) {
      if (id.match(/\.peg(gy)?$/)) {
        const source = await readFile(id).then((_) => _.toString());
        return peg.generate(source, {
          allowedStartRules: ["root", "expression"],
          output: "source",
          format: "es",
        });
      }
      return null;
    },
  };
}

export default {
  input: "src/index.js",

  output: {
    dir: "cjs",
    format: "cjs",
  },
  plugins: [resolve(), commonjs(), peggy()],
};
