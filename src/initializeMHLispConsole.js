var initialize    = require('../../jsconsole/src/initialize');
var interpretLisp = require('../../mhlisp-copy/build/_repl');

var promptLabel = 'Lisp> ';

initialize({
  promptLabel: promptLabel,
  transform: interpretLisp
});
