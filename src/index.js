import { parse } from './grammar.peggy'

const builtin = {
  b64 (txt) {
    return btoa(txt)
  },
  b64dec (txt) {
    return atob(txt)
  },
  parse (txt) {
    return JSON.parse(txt)
  },
  json (o) {
    return JSON.stringify(o)
  },
  jsonPretty (o) {
    return JSON.stringify(o, null, 2)
  }
}

/**
 * Compiles an input template to the output format.
 *
 * You can override and provide functions via values option.
 * @param {string} template The template to be compiled.
 * @param {Record<string, any>} values Values to be sent to the compiler.
 * @returns {string} The result of compiling the template
 */
export function compile (template, values = {}) {
  return parse(template, { values: { ...builtin, ...values } })
}
