// https://github.com/pedsmoreira/battlecry/blob/master/src/helpers/namedCasex.js

const casex = require('casex');
const pluralize = require('pluralize');

function resolveMatch(match) {
  if (match.endsWith('S')) match = match.substring(0, match.length - 1);

  const hasS = match.endsWith('s');
  const singularMatch = hasS ? match.substring(0, match.length - 1) : match;

  const doubleStart = singularMatch.startsWith('__');
  const doubleEnd = singularMatch.endsWith('__');

  if (doubleStart && doubleEnd) return singularMatch;
  if (doubleStart && !doubleEnd)
    return singularMatch.substring(1) + (hasS ? 's' : '');
  if (doubleEnd && !doubleStart)
    return singularMatch.substring(0, singularMatch.length - 1);
  return match;
}

function applyPluralization(name, match) {
  if (match.startsWith('__')) return name;

  const isPlural = match.endsWith('s');
  return isPlural ? pluralize.plural(name) : pluralize.singular(name);
}

function extractPluralizedPattern(match) {
  if (match.startsWith('__')) return match.substring(2, match.length - 2);

  const hasModifier = !match.endsWith('_');
  return match.substring(1, match.length - (hasModifier ? 2 : 1));
}

function namedCasex(text, name) {
  let newStr = text;

  const matches = text.match(/(_?)_na([^a-zA-Z]*)me_(_?)(s?)/gi) || [];
  let pos = 0;

  matches.forEach(match => {
    match = resolveMatch(match);

    // $FlowFixMe
    const casexedName = casex(
      applyPluralization(name, match),
      extractPluralizedPattern(match)
    );

    const index = newStr.indexOf(match, pos);
    newStr =
      newStr.substring(0, index) +
      casexedName +
      newStr.substring(index + match.length);
    pos = index + casexedName.length + 1;
  });

  return newStr;
}

module.exports = namedCasex;
