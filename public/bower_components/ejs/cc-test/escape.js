var ejs = require('../index.js');
var read = require('fs').readFileSync;
var str = read('./src/escape.ejs', 'utf8');
var out = ejs.render(str, {
  open: '{{',
  close: '}}',
  htmlString: "<p>hello world !</p>"
});

console.log(out);
