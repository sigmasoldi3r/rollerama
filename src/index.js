import { parse } from "./grammar.peggy";

const builtin = {
  b64(txt) {
    return btoa(txt);
  },
  b64dec(txt) {
    return atob(txt);
  },
  parse(txt) {
    return JSON.parse(txt);
  },
  json(o) {
    return JSON.stringify(o);
  },
  jsonPretty(o) {
    return JSON.stringify(o, null, 2);
  },
};

export function compile(template, values = {}) {
  return parse(template, { values: { ...builtin, ...values } });
}
