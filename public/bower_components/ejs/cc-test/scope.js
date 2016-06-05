var ejs = require('../index.js');
var read = require('fs').readFileSync;
var str = read('./src/scope.ejs', 'utf8');
var out = ejs.render(str, {
  open: '{{',
  close: '}}',
  scope: {
    hello: "hello world !"
  }
});

console.log(out);
