/**Хелперы - if с проверкой равенства*/

import pkg from 'handlebars';
const { HelperOptions } = pkg;

export default function if_eq(a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
};