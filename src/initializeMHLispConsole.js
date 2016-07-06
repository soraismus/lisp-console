var initialize    = require('../../jsconsole/src/initialize');
var interpretLisp = require('../../mhlisp-copy/build/interpret');

var promptLabel = 'Lisp> ';

function getCandidates(prefix) {
  return getMatches(
    prefix,
    interpretLisp("(keys (-get-current-env-))")[0]
      .value
      .slice(1, -1)
      .split(' '));
}

function getMatches(prefix, words) {
  if (!/^[-a-zA-Z0-9]+$/.test(prefix)) {
    return [];
  }
  var regex = RegExp('(^|\W):' + prefix);
  var matches = [];
  for (var index in words) {
    var word = words[index];
    if (regex.test(word)) {
      matches.push(word.slice(1));
    }
  }
  return matches;
}

initialize({
  promptLabel: promptLabel,
  transform: interpretLisp,
  getCandidates: getCandidates
});
