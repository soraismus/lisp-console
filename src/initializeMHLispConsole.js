var initialize    = require('../../jsconsole/src/initialize');
var interpretLisp = require('../../mhlisp-copy/build/interpret');

var promptLabel = 'Lisp> ';

initialize({
  promptLabel: promptLabel,
  transform: interpretLisp
});
