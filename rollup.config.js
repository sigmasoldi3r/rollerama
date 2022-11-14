import { readFile } from 'fs/promises'
import peg from 'peggy'

/** @returns {import('rollup').Plugin} */
function peggy () {
  return {
    name: 'peggy',
    async load (id) {
      if (id.match(/\.peg(gy)?$/)) {
        const source = await readFile(id).then((_) => _.toString())
        return peg.generate(source, {
          allowedStartRules: ['root', 'expression'],
          format: 'es',
          output: 'source'
        })
      }
      return null
    }
  }
}

export default {
  input: 'src/index.js',
  output: {
    dir: 'lib',
    format: 'es'
  },
  plugins: [peggy()]
}
